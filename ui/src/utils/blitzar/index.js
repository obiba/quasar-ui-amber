import makeSchemaFormTr from '../i18n'
import { TextBItem, TextAreaBItem } from './text-bitems'
import { NumberBItem, SliderBItem, RatingBItem } from './number-items'
import { RadioGroupBItem, CheckboxGroupBItem } from './options-bitems'
import { SelectBItem, AutocompleteBItem } from './select-bitems'
import { ToggleBItem } from './logical-bitems'
import { DateBItem, DatetimeBItem, TimeBItem } from './datetime-bitems'
import { SectionBItem } from './misc-bitems'

function makeBlitzarQuasarSchemaForm(schema, options) {
  const tr = makeSchemaFormTr(schema, options)
  
  const builders = [
    new TextBItem(tr), new TextAreaBItem(tr), 
    new NumberBItem(tr), new SliderBItem(tr), new RatingBItem(tr), 
    new RadioGroupBItem(tr), new CheckboxGroupBItem(tr), 
    new SelectBItem(tr), new AutocompleteBItem(tr),
    new ToggleBItem(tr),
    new DateBItem(tr), new DatetimeBItem(tr), new TimeBItem(tr),
    new SectionBItem(tr)
  ]

  const makeBItem = (item, prefix, parentCondition) => {
    const condition = item.condition ? (parentCondition ? `(${parentCondition}) && (${item.condition})` : `${item.condition}`) : parentCondition
    let bitem = undefined;
    const builder = builders.filter(b => b.isFor(item.type)).pop()
    if (builder) {
      bitem = builder.makeBItem(item, prefix)
    } else if (item.type === 'group') {
      bitem = [];
      bitem.push({
        id: prefix + item.name,
        component: 'div',
        slot: [
          {
            component: 'div',
            id: (prefix + item.name).replaceAll('.', '_').toLowerCase(),
            slot: tr(item.label),
            class: item.labelClass ? item.labelClass : 'text-h4'
          },
          {
            component: 'div',
            slot: tr(item.description),
            class: item.descriptionClass ? item.descriptionClass : 'text-subtitle2 text-grey-8'
          }
        ]
      });
      if (item.items) {
        item.items.forEach(child => {
            bitem.push(makeBItem(child, prefix + item.name + '.', condition));
        });
      }
    }

    if (bitem) {
      const bitem0 = Array.isArray(bitem) ? bitem[0] : bitem;
      console.log('>>> ' + bitem0.id)
      if (bitem0 && item.validation) {
        const script = `{
          try {
            return !(${item.validation})
          } catch (err) {
            return false
          }
        }`
        console.log('validation: ' + script)
        try {
          bitem0.error = new Function('return (val, { formData }) => ' + script)();
          if (!bitem0.dynamicProps)
            bitem0.dynamicProps = [];
          bitem0.dynamicProps.push('error');
          if (item.validationMessage)
            bitem0['error-message'] = tr(item.validationMessage)
          else  
            bitem0['error-message'] = tr('Error')
        } catch (err) {
          console.error(err)
        }
      }
      
      if (bitem0 && condition) {
        const script = `{
          try {
            const rval = ${condition}
            if (!rval) { updateField({ id: '${bitem0.id}', value: undefined }) }
            return rval
          } catch (err) {
            return false
          }
        }`
        console.log('condition: ' + script)
        try {
          bitem0.showCondition = new Function('return (val, { formData, updateField }) => ' + script)();
        } catch (err) {
          console.error(err)
        }
      }
      if (bitem0 && item.disabled) {
        
        const script = `{
          try {
            const rval = (${item.disabled})
            if (rval) { updateField({ id: '${bitem0.id}', value: undefined }) }
            return rval
          } catch (err) {
            return false
          }
        }`
        console.log('disabled: ' + script)
        try {
          bitem0.dynamicProps = bitem0.dynamicProps ? bitem0.dynamicProps.push('disabled') : ['disabled']
          bitem0.disabled = new Function('return (val, { formData, updateField }) => ' + script)();
        } catch (err) {
          console.error(err)
        }
      }
      if (bitem0 && item.required) {
        const script = `{
          try {
            return (${item.required})
          } catch (err) {
            return false
          }
        }`
        console.log('required: ' + script)
        try {
          //bitem0.dynamicProps = bitem0.dynamicProps ? bitem0.dynamicProps.push('required') : ['required']
          bitem0.required = new Function('return (val, { formData, updateField }) => ' + script)();
        } catch (err) {
          console.error(err)
        }
      }
    }
    return bitem;
  };

  const prefix = options.prefix ? options.prefix + '.' : '';
  const bschema = [];
  if (schema.items) {
    schema.items.forEach(item => {
      const bitem = makeBItem(item, prefix)
      if (bitem) {
        if (Array.isArray(bitem)) {
          bitem.forEach(item => bschema.push(item))
        } else {
          bschema.push(bitem)
        }
      } else {
        console.error('Can\'t make a Blitzar/Quasar item from ' + JSON.stringify(item, null, ' '))
      }
    })
  }
  console.log(bschema)
  return bschema;
}
  
export default makeBlitzarQuasarSchemaForm