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
        subLabel: this.trmd(item.description),
        defaultValue: item.default,
        options: item.options ? item.options.map(opt => {
          return {
            value: opt.value,
            label: this.tr(opt.label)
          }
        }) : [],
        labelClasses: item.labelClass
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
        subLabel: this.trmd(item.description),
        defaultValue: BItem.stringToArray(item.default),
        type: 'checkbox',
        options: item.options ? item.options.map(opt => {
          return {
            value: opt.value,
            label: this.tr(opt.label)
          }
        }) : [],
        labelClasses: item.labelClass
      }
    }

}

export { RadioGroupBItem, CheckboxGroupBItem }