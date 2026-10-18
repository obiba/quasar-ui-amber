# Amber Form Components

[![npm](https://img.shields.io/npm/v/@obiba/quasar-ui-amber.svg?label=@obiba/quasar-ui-amber)](https://www.npmjs.com/package/@obiba/quasar-ui-amber)
[![npm](https://img.shields.io/npm/dt/@obiba/quasar-ui-amber.svg)](https://www.npmjs.com/package/@obiba/quasar-ui-amber)

**Compatible with Quasar UI v2 and Vue 3**.

# Components

* `QADate` input with date picker, using ISO-8601 format
* `QADatetime` input with date and time pickers, using ISO-8601 and 24h formats
* `QATime` input with time picker, using 24h format
* `QAAutocomplete` input is a text field with autocomplete
* `QAImageSelect` input is a select component combined with an image map
* `QAMap` input is a geographic map on which points, linestrings and polygons can be selected, using GeoJSON format
* `QASection` is a section component (a header and a body), with Markdown support
* `AmberForm` renders an Amber form in either format: the legacy one (`items` and `i18n`) with [Blitzar](https://github.com/obiba/blitzar), the JSON Forms one (`schema`, `uischema` and `translations`, see [`@obiba/quasar-ui-json-form/amber`](https://www.obiba.org/quasar-json-form/#/migration/amber)) with `QJsonForm`. The collected data is the same.

## AmberForm

`@blitzar/form` and `@obiba/quasar-ui-json-form` are peer dependencies: the application installs
both (with the stylesheet and the i18n messages of `@obiba/quasar-ui-json-form`) during the
transition from the legacy forms.

```html
<AmberForm ref="form" v-model="data" :schema="crf.schema" :locale="locale"
  :page="multi ? data.__step : undefined" :lang="{ requiredField: t('required_field') }" />
```

```js
const errors = form.value.validate() // [{ id, label, message }] of the items shown, now displayed
```

| Prop | Description |
|---|---|
| `schema` | the Amber form schema, legacy (`items`) or JSON Forms (`uischema`) |
| `modelValue` | the form data (`v-model`) |
| `locale` | the language of the form |
| `page` | the index of the top-level item shown (multiple steps layout); all of them when undefined |
| `readonly` | display the data only |
| `applyDefaults` | set the item defaults in a new record (JSON Forms format; the Blitzar forms always do) |
| `lang` | messages: `requiredField` |
| `fileUpload` | the file upload hooks (`upload`, `remove`, `download`...) of the `file` and `files` controls (JSON Forms format), see `makeFileQueue` |

`isJsonForm(schema)` tells the format of a form schema, `getPageCount(schema)` its number of
pages, `isPageHidden(schema, page, data)` whether a page has nothing to show (all its items
hidden by their visibility rules, JSON Forms format), and `makeSchemaFormTr(schema, { locale })` translates its texts in both formats.
`getToc(schema, { locale, data })` lists its top-level groups and sections with a label as
`[{ id, label }]` (the labels translated by `tr` when given, their `{{ expression }}` placeholders filled with `data`), and `getTocElement(id)` finds the element of an entry in the rendered form, to
scroll to it (a "go to" menu).

## File queue

`makeFileQueue({ upload, download })` stores the files picked in a form in the browser (IndexedDB),
so that a form can be filled offline, and uploads them when the record is saved:

```js
const queue = makeFileQueue({
  // the upload of a file to the server, returns { id, fileName, size, contentType }
  upload: (blob, { fileName, contentType }) => api.post('/files', blob, {
    headers: { 'Content-Type': contentType, 'X-File-Name': encodeURIComponent(fileName) }
  }).then(res => res.data),
  // the download of a stored file, with the app authentication (optional)
  download: (item) => api.get(`/files/${item.id || item.path}`, { responseType: 'blob' }).then(res => res.data)
})
```

```html
<AmberForm v-model="data" :schema="crf.schema" :file-upload="queue.fileUpload" />
```

```js
const saved = await queue.flush(data) // the queued files are uploaded, their local ids replaced by the server ids
await api.post('/case-report', { ...record, data: saved })
await queue.clear(saved) // the queued files of the saved record are deleted
```

- A picked file gets a `local:<uuid>` id: the `file` controls store this id, the `files` controls
  an item `{ id, fileName, size, contentType }`. The browser is asked to persist the storage.
- `flush(data)` uploads each queued file once: the server id is kept, so a retry after a failure
  does not upload it again. A queued file that is no longer in the browser storage is dropped from
  the data. The data passed is not modified.
- `remove` deletes a queued file from the browser; `download` serves a queued file from the
  browser, a stored one with the `download` option.

# Usage

## Quasar CLI project

Install the [App Extension](../app-extension).

**OR**:

Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-amber'

Vue.use(Plugin)
```

**OR**:

```html
<script>
import { Component as QADate } from 'quasar-ui-amber'

export default {
  components: {
    QADate
  }
}
</script>
```

## Vue CLI project

```js
import Vue from 'vue'
import Plugin from 'quasar-ui-amber'

Vue.use(Plugin)
```

**OR**:

```html
<script>
import { QADate } from 'quasar-ui-amber'

export default {
  components: {
    QADate
  }
}
</script>
```

## UMD variant

Exports `window.amberFormUI`.

Add the following tag(s) after the Quasar ones:

```html
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/quasar-ui-amber/dist/index.umd.min.js"></script>
</body>
```

# Setup
```bash
$ yarn
```

# Developing
```bash
# start dev in SPA mode
$ yarn dev

# start dev in UMD mode
$ yarn dev:umd

# start dev in SSR mode
$ yarn dev:ssr

# start dev in Cordova iOS mode
$ yarn dev:ios

# start dev in Cordova Android mode
$ yarn dev:android

# start dev in Electron mode
$ yarn dev:electron
```

# Testing
```bash
$ yarn test
```

# Building package
```bash
$ yarn build
```

# Adding Testing Components
in the `ui/dev/src/pages` you can add Vue files to test your component/directive. When using `yarn dev` to build the UI, any pages in that location will automatically be picked up by dynamic routing and added to the test page.

# Adding Assets
If you have a component that has assets, like language or icon-sets, you will need to provide these for UMD. In the `ui/build/script.javascript.js` file, you will find a couple of commented out commands that call `addAssets`. Uncomment what you need and add your assets to have them be built and put into the `ui/dist` folder.

# License
MIT (c) Yannick Marcon <yannick.marcon@obiba.org>
