// npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { makeFileQueue, makeIndexedDBStore } from '../src/utils/file-queue.js'

const memoryStore = () => {
  const map = new Map()
  return {
    map,
    get: async (id) => map.get(id),
    getAll: async () => [...map.values()],
    put: async (entry) => { map.set(entry.id, { ...entry }) },
    delete: async (id) => { map.delete(id) }
  }
}

const file = (content, name, type = 'text/plain') => new File([content], name, { type })

test('queues, flushes once and clears the files of a record', async () => {
  const store = memoryStore()
  let count = 0
  const uploads = []
  const upload = async (blob, { fileName, contentType }) => {
    uploads.push(fileName)
    if (fileName === 'fail.txt' && count++ === 0) throw new Error('offline')
    return { id: 'srv-' + fileName, fileName, size: blob.size, contentType }
  }
  const queue = makeFileQueue({ upload, store })

  const doc = await queue.fileUpload.upload(file('hello', 'doc.txt'), { schema: { type: 'string', format: 'file' } })
  assert.match(doc, /^local:/)
  const photo = await queue.fileUpload.upload(file('png', 'photo.png', 'image/png'), { schema: { type: 'array' } })
  assert.deepEqual({ ...photo, id: undefined }, { id: undefined, fileName: 'photo.png', size: 3, contentType: 'image/png' })
  const fail = await queue.fileUpload.upload(file('x', 'fail.txt'), { schema: { type: 'array' } })

  const data = { _id: 'R1', doc, group: { photos: [{ ...photo, justUploaded: true }, fail] }, note: 'local note', kept: { id: 'srv-old', fileName: 'old.txt' } }

  // the upload of the third file fails: the first two are uploaded once
  await assert.rejects(queue.flush(data), /offline/)
  const flushed = await queue.flush(data)
  assert.deepEqual(uploads, ['doc.txt', 'photo.png', 'fail.txt', 'fail.txt'])
  assert.deepEqual(flushed, {
    _id: 'R1',
    doc: 'srv-doc.txt',
    group: { photos: [{ id: 'srv-photo.png', fileName: 'photo.png', size: 3, contentType: 'image/png' }, { ...fail, id: 'srv-fail.txt' }] },
    note: 'local note',
    kept: { id: 'srv-old', fileName: 'old.txt' }
  })
  // the record data is not modified
  assert.equal(data.doc, doc)

  // another record's file stays queued
  const other = await queue.fileUpload.upload(file('o', 'other.txt'), {})
  await queue.clear(flushed)
  assert.deepEqual([...store.map.keys()], [other])
})

test('keeps a removed file and drops a lost file', async () => {
  const store = memoryStore()
  const queue = makeFileQueue({ upload: async () => assert.fail('no upload'), store })
  const ref = await queue.fileUpload.upload(file('x', 'x.txt'), { schema: { type: 'object' } })
  // the removal can be cancelled: the file stays queued
  await queue.fileUpload.remove(ref)
  assert.equal(store.map.size, 1)
  store.map.clear()
  const warn = console.warn
  console.warn = () => {}
  try {
    assert.deepEqual(await queue.flush({ a: ref.id, b: [ref], c: 'x' }), { a: undefined, b: [], c: 'x' })
  } finally {
    console.warn = warn
  }
})

test('stores the id in a path control and links a server file without a download hook', async () => {
  const queue = makeFileQueue({ upload: async () => assert.fail('no upload'), store: memoryStore() })
  // no schema type: a path control, as in the renderer
  assert.match(await queue.fileUpload.upload(file('x', 'x.txt'), { schema: { format: 'file' } }), /^local:/)
  const opened = []
  globalThis.window = { open: (url) => opened.push(url) }
  try {
    await queue.fileUpload.download({ id: 'srv-1', fileName: 'a.txt' }, { options: { downloadUrl: '/files/{id}/{fileName}' } })
    assert.deepEqual(opened, ['/files/srv-1/a.txt'])
    await assert.rejects(queue.fileUpload.download({ id: 'srv-1' }, { options: {} }), /No download link/)
  } finally {
    delete globalThis.window
  }
})

test('reopens the database after a failed open', async () => {
  let calls = 0
  globalThis.indexedDB = {
    open: () => {
      calls++
      const req = {}
      setTimeout(() => { req.error = new Error('denied'); req.onerror() })
      return req
    }
  }
  try {
    const store = makeIndexedDBStore()
    await assert.rejects(store.get('x'), /denied/)
    await assert.rejects(store.get('x'), /denied/)
    assert.equal(calls, 2)
  } finally {
    delete globalThis.indexedDB
  }
})
