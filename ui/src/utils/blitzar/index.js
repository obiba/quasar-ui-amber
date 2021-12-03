import makeSchemaFormTr from '../i18n'
import BItem from './bitem'
import { TextBItem, TextAreaBItem } from './text-bitems'
import { NumberBItem, SliderBItem, RatingBItem } from './number-items'
import { RadioGroupBItem, CheckboxGroupBItem } from './options-bitems'
import { SelectBItem, AutocompleteBItem } from './select-bitems'
import { ToggleBItem } from './logical-bitems'
import { DateBItem, DatetimeBItem, TimeBItem } from './datetime-bitems'
import { SectionBItem, ComputedBItem } from './misc-bitems'

function makeBlitzarQuasarSchemaForm(schema, options) {
  const tr = makeSchemaFormTr(schema, options)
  let stepCount = 0

  const builders = [
    new TextBItem(tr), new TextAreaBItem(tr), 
    new NumberBItem(tr), new SliderBItem(tr), new RatingBItem(tr), 
    new RadioGroupBItem(tr), new CheckboxGroupBItem(tr), 
    new SelectBItem(tr), new AutocompleteBItem(tr),
    new ToggleBItem(tr),
    new DateBItem(tr), new DatetimeBItem(tr), new TimeBItem(tr),
    new SectionBItem(tr), new ComputedBItem(tr)
  ]

  const makeBItem = (item, prefix, parentLogicalCondition, showCondition) => {
    let logicalCondition = (item.condition ? (parentLogicalCondition ? `(${parentLogicalCondition}) && (${item.condition})` : `${item.condition}`) : parentLogicalCondition)
    let bitem = undefined
    
    const builder = builders.filter(b => b.isFor(item.type)).pop()
    if (builder) {
      bitem = builder.makeBItem(item, prefix)
    } else if (item.type === 'group') {
      bitem = []
      bitem.push({
        id: prefix + item.name,
        component: 'div',
        slot: [
          {
            component: 'div',
            id: (prefix + item.name).replaceAll('.', '_').toLowerCase(),
            slot: tr(item.label),
            class: item.labelClass ? item.labelClass : 'text-h5'
          },
          {
            component: 'div',
            slot: tr(item.description),
            class: item.descriptionClass ? item.descriptionClass : 'text-subtitle2 text-grey-8'
          }
        ]
      })
      if (item.items) {
        item.items.forEach(child => {
            bitem.push(makeBItem(child, prefix + item.name + '.', logicalCondition, showCondition))
        })
      }
    }

    if (bitem) {
      const bitem0 = Array.isArray(bitem) ? bitem[0] : bitem
      if (options.debug) console.debug('>>> ' + bitem0.id)

      // validation
      if (bitem0 && item.validation) {
        const bvalidation = BItem.variableRefRewrite(item.validation)
        const script = `{
          try {
            return !(${bvalidation})
          } catch (err) {
            console.error('${bitem0.id}.validation eval error')
            console.error(err)
            return false
          }
        }`
        if (options.debug) console.debug('validation: ' + script)
        try {
          bitem0.error = new Function('return (val, { formData }) => ' + script)()
          bitem0.dynamicProps = ['error']
          if (item.validationMessage)
            bitem0.errorMessage = tr(item.validationMessage)
          else  
            bitem0.errorMessage = tr('Error')
        } catch (err) {
          console.error(err)
        }
      }
      
      // conditions: logical and show
      if (bitem0 && (logicalCondition || showCondition)) {
        let script
        if (logicalCondition) {
          const bcondition = BItem.variableRefRewrite(logicalCondition)
          script = `{
            try {
              const rval = ${bcondition}
              if (!rval && updateField) { updateField({ id: '${bitem0.id}', value: undefined }) }
              return (${showCondition}) === undefined ? rval : ((${showCondition}) && rval)
            } catch (err) {
              console.error('${bitem0.id}.condition eval error')
              console.error(err)
              return false
            }
          }`
        } else {
          script = `{
            try {
              return ${showCondition}
            } catch (err) {
              console.error('${bitem0.id}.condition eval error')
              console.error(err)
              return false
            }
          }`
        }
        if (options.debug) console.debug('condition: ' + script)
        try {
          bitem0.dynamicProps = bitem0.dynamicProps ? [...bitem0.dynamicProps, 'showCondition'] : ['showCondition']
          bitem0.showCondition = new Function('return (val, { formData, updateField }) => ' + script)()
        } catch (err) {
          console.error(err)
        }
      }

      // disabled
      if (bitem0 && item.disabled) {
        const bdisabled = BItem.variableRefRewrite(item.disabled)
        const script = `{
          try {
            const rval = (${bdisabled})
            if (rval) { updateField({ id: '${bitem0.id}', value: undefined }) }
            return rval
          } catch (err) {
            console.error('${bitem0.id}.disabled eval error')
            console.error(err)
            return false
          }
        }`
        if (options.debug) console.debug('disabled: ' + script)
        try {
          bitem0.dynamicProps = bitem0.dynamicProps ? [...bitem0.dynamicProps, 'disabled'] : ['disabled']
          bitem0.disabled = new Function('return (val, { formData, updateField }) => ' + script)()
        } catch (err) {
          console.error(err)
        }
      }

      // required
      if (bitem0) {
        let brequired = item.required ? BItem.variableRefRewrite(item.required) : 'false'
        const script = `{
          try {
            return (${brequired})
          } catch (err) {
            console.error('${bitem0.id}.required eval error')
            console.error(err)
            return false
          }
        }`
        if (options.debug) console.debug('required: ' + script)
        try {
          bitem0.dynamicProps = bitem0.dynamicProps ? [...bitem0.dynamicProps, 'required'] : ['required']
          bitem0.required = new Function('return (val, { formData, updateField }) => ' + script)()
        } catch (err) {
          console.error(err)
        }
      }
    }
    return bitem
  }

  const prefix = options.prefix ? options.prefix + '.' : ''
  const bschema = []
  if (schema.items) {
    schema.items.forEach(item => {
      const showCondition = options.stepId ? `formData.${options.stepId} === ${stepCount}` : undefined
      const bitem = makeBItem(item, prefix, undefined, showCondition)
      if (bitem) {
        if (Array.isArray(bitem)) {
          bitem.forEach(item => bschema.push(item))
        } else {
          bschema.push(bitem)
        }
        stepCount++
      } else {
        console.error('Can\'t make a Blitzar/Quasar item from ' + JSON.stringify(item, null, ' '))
      }
    })
  }
  if (options.debug) console.debug(bschema)
  return bschema
}

// blitzar ids from amber schema names
function getBlitzarIdsAt(schema, position) {
  const stepItem = schema.items[position]
  // concat items names recursively
  const getItemNames = (item) => {
      if (item.items) {
      const names = []
      item.items.forEach(i => {
          getItemNames(i).forEach(name => names.push(name))
      })
      return names.map(name => item.name + '.' + name)
      }
      return [item.name]
  }
  return getItemNames(stepItem)
}
  
export { makeBlitzarQuasarSchemaForm, getBlitzarIdsAt }