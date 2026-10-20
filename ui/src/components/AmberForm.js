import { h, ref, computed, watch } from 'vue'
import { BlitzForm, validateFormPerSchema } from '@blitzar/form'
import { QJsonForm, ruleEngine, fillPlaceholders, countryCodes } from '@obiba/quasar-ui-json-form'
import { makeBlitzarQuasarSchemaForm, getBlitzarErrors } from '../utils/blitzar'
import makeSchemaFormTr from '../utils/i18n'

/** data key of the page shown by the Blitzar forms (removed from the emitted data) */
const PAGE_KEY = '__amberPage'

/**
 * Whether an Amber form schema is in the JSON Forms format (`schema`,
 * `uischema` and `translations`, from `@obiba/quasar-ui-json-form/amber`),
 * rather than the legacy one (`items` and `i18n`, rendered with Blitzar).
 */
function isJsonForm (schema) {
  return !!schema && typeof schema.uischema === 'object' && schema.uischema !== null
}

/** The number of pages of a form in the multiple steps layout: one per top-level item. */
function getPageCount (schema) {
  if (isJsonForm(schema)) return Array.isArray(schema.uischema.elements) ? schema.uischema.elements.length : 0
  return schema && Array.isArray(schema.items) ? schema.items.length : 0
}

/** a JSON Forms text with its `{{ expression }}` placeholders replaced by their value with the data */
const fillTexts = (text, data) => fillPlaceholders(text, (expression) => ruleEngine.evaluate(expression, data || {}, null))

/** the class of the top-level item `index` of a JSON Forms form (see `getToc`) */
const itemClass = (index) => `amber-item-${index}`

/** the top-level elements of a JSON Forms UI schema, each with the class of its index */
const tagElements = (uischema) => (uischema.elements || []).map((element, index) => {
  const cls = element.options && typeof element.options.class === 'string' ? element.options.class + ' ' : ''
  return { ...element, options: { ...element.options, class: cls + itemClass(index) } }
})

/**
 * The table of contents of a form: its top-level groups and sections that
 * have a label, as `[{ id, label }]`; `getTocElement(id)` is the element of
 * the rendered form to scroll to. The labels are translated in `options.locale`,
 * or by `options.tr`, and their placeholders filled with `options.data`.
 */
function getToc (schema, options = {}) {
  const tr = options.tr || makeSchemaFormTr(schema, options)
  if (isJsonForm(schema)) {
    return (schema.uischema.elements || [])
      .map((element, index) => ({ id: itemClass(index), label: ['Group', 'Section'].includes(element.type) && element.label ? fillTexts(tr(element.label), options.data) : undefined }))
      .filter(entry => entry.label)
  }
  return (schema && Array.isArray(schema.items) ? schema.items : [])
    .filter(item => ['group', 'section'].includes(item.type) && item.label)
    .map(item => ({ id: item.name.replaceAll('.', '_').toLowerCase(), label: tr(item.label) }))
    .filter(entry => entry.label)
}

/** The element of a table of contents entry, in the rendered form. */
function getTocElement (id) {
  return document.getElementById(id) || document.querySelector(`.amber-form .${id}`)
}

/** `#/properties/A/properties/B` → `/A/B` */
const toDataPath = (scope) => scope.replace(/^#/, '').replace(/\/properties\//g, '/')

/** the data paths of the controls of a UI schema element */
function controlPaths (element, paths = []) {
  if (element && typeof element === 'object') {
    if (typeof element.scope === 'string') paths.push(toDataPath(element.scope))
    if (Array.isArray(element.elements)) element.elements.forEach(child => controlPaths(child, paths))
  }
  return paths
}

/** the data path an AJV error is about: the `required` errors point at the missing property */
const errorPath = (error) => {
  const missing = error.keyword === 'required' && error.params ? error.params.missingProperty : undefined
  return typeof missing === 'string' ? `${error.instancePath}/${missing}` : error.instancePath
}

/** the schema of the property at a data path */
const propertyAt = (schema, path) => path.split('/').slice(1)
  .reduce((s, key) => (s && s.properties ? s.properties[key] : undefined), schema)

/** whether a UI schema element shows nothing: its visible rule fails, or all its children are hidden */
function isElementHidden (element, schema, data) {
  const property = typeof element.scope === 'string' ? propertyAt(schema, toDataPath(element.scope)) : undefined
  const rule = (element.rules && element.rules.visible) || (property && property.rules && property.rules.visible)
  // as in the renderers, a rule that fails to evaluate keeps the element visible
  if (typeof rule === 'string' && rule.length > 0 && ruleEngine.evaluate(rule, data, true) !== true) return true
  return Array.isArray(element.elements) && element.elements.every(child => isElementHidden(child, schema, data))
}

/**
 * Whether a page of a form in the multiple steps layout (see `getPageCount`)
 * has nothing to show with the data, its items being hidden by their
 * visibility rules, so that it can be skipped.
 */
function isPageHidden (schema, page, data) {
  // ponytail: JSON Forms only, the pages of the legacy forms are never hidden
  if (!isJsonForm(schema) || !Array.isArray(schema.uischema.elements)) return false
  const element = schema.uischema.elements[page]
  return !!element && isElementHidden(element, schema.schema, data || {})
}

/**
 * An Amber form, in either format: the legacy one is rendered with Blitzar,
 * the JSON Forms one with `QJsonForm`. The collected data is the same.
 *
 * `page` shows one top-level item (multiple steps layout), all of them when
 * undefined. `validate()` returns the errors of the shown items as
 * `[{ id, label, message }]` (as `getBlitzarErrors`), and displays them.
 */
export default {
  name: 'AmberForm',
  props: {
    modelValue: { type: Object, default: () => ({}) },
    /** the Amber form schema, legacy (`items`) or JSON Forms (`uischema`) */
    schema: { type: Object, required: true },
    locale: { type: String, default: undefined },
    /** the index of the top-level item shown; undefined shows them all */
    page: { type: Number, default: undefined },
    readonly: { type: Boolean, default: false },
    /** set the item defaults (a new record); the Blitzar forms always do */
    applyDefaults: { type: Boolean, default: false },
    /** messages: `requiredField` */
    lang: { type: Object, default: () => ({}) },
    /** JSON Forms only: the file upload hooks (`upload`, `remove`, `download`...), see `makeFileQueue` */
    fileUpload: { type: Object, default: undefined },
    debug: { type: Boolean, default: false }
  },
  emits: ['update:modelValue'],

  setup (props, { emit, expose }) {
    const isJson = computed(() => isJsonForm(props.schema))
    const shown = ref(false)
    const tr = (key) => makeSchemaFormTr(props.schema, { locale: props.locale })(key)
    const requiredMessage = () => props.lang.requiredField || 'Field is required'

    // --- Blitzar

    const blitzarSchema = computed(() => isJson.value
      ? []
      : makeBlitzarQuasarSchemaForm(props.schema, {
        locale: props.locale,
        debug: props.debug,
        ...(props.page !== undefined ? { stepId: PAGE_KEY } : {})
      }))

    const blitzarData = computed(() => props.page === undefined
      ? props.modelValue
      : { ...props.modelValue, [PAGE_KEY]: props.page })

    const onBlitzarUpdate = (data) => {
      const { [PAGE_KEY]: _page, ...rest } = data || {}
      emit('update:modelValue', rest)
    }

    const validateBlitzar = () => getBlitzarErrors(blitzarSchema.value, validateFormPerSchema(blitzarData.value, blitzarSchema.value))

    // --- JSON Forms

    // every page is rendered, the other ones hidden: their computations,
    // conditions and clearings keep applying as the data changes
    const uischema = computed(() => {
      const ui = props.schema.uischema
      if (!isJson.value) return ui
      const elements = tagElements(ui)
      if (props.page === undefined) return { ...ui, elements }
      return {
        ...ui,
        elements: elements.map((element, index) => index === props.page
          ? element
          : { type: 'VerticalLayout', options: { class: 'hidden' }, elements: [element] })
      }
    })

    const jsonErrors = ref([])

    // the countries controls list all the countries, unless a form sets its own `countries`
    const config = computed(() => ({ countries: countryCodes, ...(props.fileUpload ? { fileUpload: props.fileUpload } : {}) }))

    const validateJson = () => {
      const elements = props.schema.uischema.elements || []
      const paths = controlPaths(props.page === undefined ? props.schema.uischema : elements[props.page])
      const seen = new Set()
      return jsonErrors.value
        .map(error => ({ error, path: errorPath(error) }))
        .filter(({ path }) => paths.some(p => path === p || path.startsWith(p + '/')))
        .filter(({ error, path }) => !seen.has(path + error.keyword) && seen.add(path + error.keyword))
        .map(({ error, path }) => {
          const property = propertyAt(props.schema.schema, path)
          const title = property ? property.title : undefined
          return {
            id: path.slice(1).replaceAll('/', '.'),
            label: title ? fillTexts(tr(title), props.modelValue) : path.slice(1).replaceAll('/', '.'),
            message: error.keyword === 'required' ? requiredMessage() : error.message
          }
        })
    }

    // a new form (another page, another record) shows its errors again on validation only
    watch(() => [props.schema, props.page], () => { shown.value = false })

    expose({
      validate () {
        shown.value = true
        return isJson.value ? validateJson() : validateBlitzar()
      }
    })

    return () => isJson.value
      ? h(QJsonForm, {
        class: 'amber-form',
        modelValue: props.modelValue,
        'onUpdate:modelValue': (data) => emit('update:modelValue', data),
        'onUpdate:errors': (errors) => { jsonErrors.value = errors },
        schema: props.schema.schema,
        uischema: uischema.value,
        translations: props.schema.translations,
        locale: props.locale,
        readonly: props.readonly,
        applyDefaults: props.applyDefaults,
        config: config.value,
        validationMode: shown.value ? 'ValidateAndShow' : 'ValidateAndHide'
      })
      : h(BlitzForm, {
        class: 'amber-form',
        key: props.page,
        schema: blitzarSchema.value,
        modelValue: blitzarData.value,
        'onUpdate:modelValue': onBlitzarUpdate,
        columnCount: 1,
        gridGap: '32px',
        mode: props.readonly ? 'disabled' : undefined,
        showErrorsOn: shown.value ? 'always' : 'interaction',
        lang: props.lang
      })
  }
}

export { isJsonForm, getPageCount, isPageHidden, getToc, getTocElement }
