import makeSchemaFormTr from './i18n'

function makeBlitzarQuasarSchemaForm(schema, options) {
  const tr = makeSchemaFormTr(schema, options)

  const makeBItem = (item, prefix, parentCondition) => {
    const condition = item.condition ? (parentCondition ? `(${parentCondition}) && (${item.condition})` : `${item.condition}`) : parentCondition
    let bitem = undefined;
    if (item.type === 'text') {
      bitem = {
        id: prefix + item.name,
        component: 'QInput',
        label: tr(item.label),
        subLabel: tr(item.description),
        placeholder: tr(item.placeholder),
        hint: tr(item.hint)
      };
    } else if (item.type === 'textarea') {
      bitem = {
        id: prefix + item.name,
        component: 'QInput',
        type: 'textarea',
        label: tr(item.label),
        subLabel: tr(item.description),
        placeholder: tr(item.placeholder),
        hint: tr(item.hint)
      };
    } else if (item.type === 'number') {
      bitem = {
        id: prefix + item.name,
        component: 'QInput',
        type: 'number',
        label: tr(item.label),
        subLabel: tr(item.description),
        hint: tr(item.hint),
        parseInput: Number
      };
    } else if (item.type === 'slider') {
      bitem = {
        id: prefix + item.name,
        component: 'QSlider',
        label: tr(item.label),
        subLabel: tr(item.description),
        defaultValue: item.default,
        // component props:
        min: item.min ? item.min : 0,
        max: item.max ? item.max : 100,
        labelAlways: true
      };
    } else if (item.type === 'rating') {
      bitem = {
        id: prefix + item.name,
        component: 'QRating',
        label: tr(item.label),
        subLabel: tr(item.description),
        hint: tr(item.hint),
        // component props:
        max: item.max ? item.max : 5,
        icon: item.icon ? item.icon : "star",
        color: item.color ? item.color : "primary",
        size: item.size ? item.size : "2em",
        parseValue: Number
      };
    } else if (item.type === 'radiogroup') {
      bitem = {
        id: prefix + item.name,
        component: 'QOptionGroup',
        label: tr(item.label),
        subLabel: tr(item.description),
        defaultValue: item.default,
        // component props:
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: tr(opt.label)
          }
        })
      };
    } else if (item.type === 'checkboxgroup') {
      bitem = {
        id: prefix + item.name,
        component: 'QOptionGroup',
        label: tr(item.label),
        subLabel: tr(item.description),
        defaultValue: () => item.default ? [item.default] : [],
        // component props:
        type: 'checkbox',
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: tr(opt.label)
          }
        })
      };
    } else if (item.type === 'select') {
      bitem = {
        id: prefix + item.name,
        component: 'QSelect',
        label: tr(item.label),
        subLabel: tr(item.description),
        hint: tr(item.hint),
        defaultValue: item.default,
        // component props:
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: tr(opt.label)
          }
        }),
        'emit-value': true,
        'map-options': true,
        clearable: true
      };
    } else if (item.type === 'multiselect') {
      bitem = {
        id: prefix + item.name,
        component: 'QSelect',
        label: tr(item.label),
        subLabel: tr(item.description),
        hint: tr(item.hint),
        defaultValue: item.default,
        // component props:
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: tr(opt.label)
          }
        }),
        'use-chips': true,
        'emit-value': true,
        'map-options': true,
        clearable: true,
        multiple: true
      };
    } else if (item.type === 'toggle') {
      bitem = {
        id: prefix + item.name,
        component: 'QToggle',
        label: tr(item.label),
        subLabel: tr(item.description)
      };
    } else if (item.type === 'date') {
      bitem = {
        id: prefix + item.name,
        component: 'QADate',
        label: tr(item.label),
        subLabel: tr(item.description),
        placeholder: tr(item.placeholder),
        hint: tr(item.hint),
        parseInput: (val) => val !== null && val.length === 0 ? null : val
      };
    } else if (item.type === 'datetime') {
      bitem = {
        id: prefix + item.name,
        component: 'QADatetime',
        label: tr(item.label),
        subLabel: tr(item.description),
        placeholder: tr(item.placeholder),
        hint: tr(item.hint),
        parseInput: (val) => val !== null && val.length === 0 ? null : val
      };
    } else if (item.type === 'time') {
      bitem = {
        id: prefix + item.name,
        component: 'QATime',
        label: tr(item.label),
        subLabel: tr(item.description),
        placeholder: tr(item.placeholder),
        hint: tr(item.hint),
        parseInput: (val) => val !== null && val.length === 0 ? null : val
      };
    } else if (item.type === 'static') {
      bitem = {
        id: prefix + item.name,
        component: 'div',
        slot: [
          {
            component: 'div',
            slot: tr(item.label),
            class: item.labelClass ? item.labelClass : 'text-h3'
          },
          {
            component: 'div',
            slot: tr(item.description),
            class: item.descriptionClass ? item.descriptionClass : 'text-subtitle1 text-grey-8'
          }
        ]
      };
    } else if (item.type === 'group') {
      bitem = [];
      bitem.push({
        id: prefix + item.name,
        component: 'div',
        slot: [
          {
            component: 'div',
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
          if (!rval) { updateField({ id: '${bitem0.id}', value: null }) }
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
          if (rval) { updateField({ id: '${bitem0.id}', value: null }) }
          return rval
        } catch (err) {
          return false
        }
      }`
      console.log('disabled: ' + script)
      try {
        bitem0.disabled = new Function('return (val, { formData, updateField }) => ' + script)();
      } catch (err) {
        console.error(err)
      }
    }
    return bitem;
  };

  const prefix = options.prefix ? options.prefix + '.' : '';
  const bschema = [];
  schema.items.forEach(item => {
    const bitem = makeBItem(item, prefix);
    if (bitem) {
      if (Array.isArray(bitem)) {
        bitem.forEach(item => bschema.push(item));
      } else {
        bschema.push(bitem);
      }
    }
      
    else
      console.error('Can\'t make a Blitzar/Quasar item from ' + JSON.stringify(item, null, ' '));
  });
  console.log(bschema)
  return bschema;
}
  
export default makeBlitzarQuasarSchemaForm