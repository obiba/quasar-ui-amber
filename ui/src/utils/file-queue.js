/** prefix of the ids of the files queued in the browser, not uploaded yet */
const LOCAL_PREFIX = 'local:'

const isLocal = (id) => typeof id === 'string' && id.startsWith(LOCAL_PREFIX)

const request = (req) => new Promise((resolve, reject) => {
  req.onsuccess = () => resolve(req.result)
  req.onerror = () => reject(req.error)
})

/** a key-value store of the queued files, in IndexedDB (localStorage cannot hold blobs) */
function makeIndexedDBStore (name = 'amber-files') {
  let db
  const open = () => {
    if (!db) {
      const req = indexedDB.open(name, 1)
      req.onupgradeneeded = () => req.result.createObjectStore('files', { keyPath: 'id' })
      db = request(req)
    }
    return db
  }
  const run = async (mode, fn) => {
    const tx = (await open()).transaction('files', mode)
    // a write is saved when its transaction completes (a quota error aborts it after the request succeeded)
    const done = new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('Transaction aborted'))
    })
    const [result] = await Promise.all([fn(tx.objectStore('files')), done])
    return result
  }
  return {
    get: (id) => run('readonly', s => request(s.get(id))),
    getAll: () => run('readonly', s => request(s.getAll())),
    put: (entry) => run('readwrite', s => request(s.put(entry))),
    delete: (id) => run('readwrite', s => request(s.delete(id)))
  }
}

/** the string values of the data (the file ids, among others) */
const strings = (value, set = new Set()) => {
  if (typeof value === 'string') set.add(value)
  else if (value && typeof value === 'object') Object.values(value).forEach(v => strings(v, set))
  return set
}

const save = (blob, fileName) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName || 'file'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * The offline file queue of a form: the picked files are stored in the browser
 * and uploaded when the record is saved, so that a form can be filled offline.
 *
 * - `fileUpload`: the hooks of the `AmberForm` `fileUpload` prop. A picked file
 *   is queued with a `local:<uuid>` id.
 * - `flush(data)`: uploads the queued files referenced by the record data
 *   (once: the server id is kept, a retry does not upload again) and returns
 *   the data with the server ids.
 * - `clear(data)`: deletes the queued files of a saved record (the data with
 *   either the local or the server ids).
 *
 * @param {Object} options
 * @param {Function} options.upload `(blob, { fileName, contentType }) => Promise<{ id, fileName, size, contentType }>`, the upload to the server
 * @param {Function} options.download `(item) => Promise<Blob>`, the download of a file from the server (optional)
 * @param {Object} options.store the storage of the queued files, IndexedDB by default
 */
function makeFileQueue ({ upload, download, store } = {}) {
  store = store || makeIndexedDBStore()

  const fileUpload = {
    async upload (file, context) {
      // ask the browser to keep the queue
      if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().catch(() => {})
      }
      const ref = {
        id: LOCAL_PREFIX + crypto.randomUUID(),
        fileName: file.name,
        size: file.size,
        contentType: file.type || 'application/octet-stream'
      }
      await store.put({ ...ref, blob: file })
      // a path control (neither array nor object, as in the renderer) stores the id only
      const type = context && context.schema && context.schema.type
      return type === 'array' || type === 'object' ? ref : ref.id
    },
    // the queued file is kept on removal: the edit can be cancelled and a saved draft may still reference it
    // ponytail: unreferenced queued files are not purged, add a sweep against the stored records if storage grows
    remove () {},
    async download (item, context) {
      const id = item.id || item.path
      if (isLocal(id)) {
        const entry = await store.get(id)
        if (!entry) throw new Error('File not found')
        save(entry.blob, entry.fileName)
      } else if (download) {
        save(await download(item), item.fileName || id)
      } else {
        // no download hook: the link of the uischema options, as the renderer does without hooks
        const template = context && context.options && context.options.downloadUrl
        const url = typeof template === 'string' && template
          ? template.replace(/\{(\w+)\}/g, (match, key) => item[key] == null ? match : String(item[key]))
          : item.url || item.href
        if (!url) throw new Error('No download link')
        window.open(url, '_blank', 'noopener')
      }
    }
  }

  /** the server id of a queued file, uploaded if not done yet; undefined when the file is lost */
  const resolve = async (id) => {
    const entry = await store.get(id)
    if (!entry) {
      // ponytail: a lost file (browser storage cleared) is dropped, so that the rest of the record can be saved
      console.warn(`Queued file ${id} not found, dropped from the record`)
      return undefined
    }
    if (!entry.serverId) {
      const ref = await upload(entry.blob, { fileName: entry.fileName, contentType: entry.contentType })
      entry.serverId = ref.id
      await store.put(entry)
    }
    return entry.serverId
  }

  const walk = async (value) => {
    if (isLocal(value)) return resolve(value)
    if (Array.isArray(value)) {
      const items = []
      for (const item of value) items.push(await walk(item))
      return items.filter(item => item !== undefined)
    }
    if (value && typeof value === 'object') {
      if (isLocal(value.id)) {
        const id = await resolve(value.id)
        // eslint-disable-next-line no-unused-vars
        const { justUploaded, ...rest } = value
        return id ? { ...rest, id } : undefined
      }
      const rval = {}
      for (const [key, val] of Object.entries(value)) rval[key] = await walk(val)
      return rval
    }
    return value
  }

  return {
    fileUpload,
    flush: (data) => walk(data),
    async clear (data) {
      const ids = strings(data)
      for (const entry of await store.getAll()) {
        if (ids.has(entry.id) || (entry.serverId && ids.has(entry.serverId))) await store.delete(entry.id)
      }
    }
  }
}

export { makeFileQueue, makeIndexedDBStore }
