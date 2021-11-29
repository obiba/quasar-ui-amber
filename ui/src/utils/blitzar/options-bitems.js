import BItem from './bitem'


class RadioGroupBItem extends BItem {

    isFor(type) {
      return type === 'radiogroup'
    }
  
    makeBItem(item, prefix) {
      return {
        id: prefix + item.name,
        component: 'QOptionGroup',
        label: this.tr(item.label),
        subLabel: this.tr(item.description),
        defaultValue: item.default,
        // component props:
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: this.tr(opt.label)
          }
        })
      }
    }
}
  
class CheckboxGroupBItem extends BItem {
  
    isFor(type) {
      return type === 'checkboxgroup'
    }
  
    makeBItem(item, prefix) {
      return {
        id: prefix + item.name,
        component: 'QOptionGroup',
        label: this.tr(item.label),
        subLabel: this.tr(item.description),
        defaultValue: () => item.default ? [item.default] : [],
        // component props:
        type: 'checkbox',
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: this.tr(opt.label)
          }
        })
      }
    }

}

export { RadioGroupBItem, CheckboxGroupBItem }