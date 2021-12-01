import BItem from './bitem'

class SelectBItem extends BItem {

    isFor(type) {
      return type === 'select'
    }
  
    makeBItem(item, prefix) {
      return {
        id: prefix + item.name,
        component: 'QSelect',
        label: this.tr(item.label),
        subLabel: this.tr(item.description),
        hint: this.tr(item.hint),
        defaultValue: item.default,
        // component props:
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: this.tr(opt.label)
          }
        }),
        'emit-value': true,
        'map-options': true,
        clearable: true
      }
    }
}
  
class MultiSelectBItem extends BItem {
  
    isFor(type) {
      return type === 'multiselect'
    }
  
    makeBItem(item, prefix) {
      return {
        id: prefix + item.name,
        component: 'QSelect',
        label: this.tr(item.label),
        subLabel: this.tr(item.description),
        hint: this.tr(item.hint),
        defaultValue: item.default,
        // component props:
        options: item.options.map(opt => {
          return {
            value: opt.value,
            label: this.tr(opt.label)
          }
        }),
        'use-chips': true,
        'emit-value': true,
        'map-options': true,
        clearable: true,
        multiple: true
      }
    }
}

class AutocompleteBItem extends BItem {
  
  isFor(type) {
    return type === 'autocomplete'
  }

  makeBItem(item, prefix) {
    return {
      id: prefix + item.name,
      component: 'QAAutocomplete',
      label: this.tr(item.label),
      subLabel: this.tr(item.description),
      hint: this.tr(item.hint),
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

class MultiAutocompleteBItem extends BItem {
  
  isFor(type) {
    return type === 'multiautocomplete'
  }

  makeBItem(item, prefix) {
    return {
      id: prefix + item.name,
      component: 'QAAutocomplete',
      label: this.tr(item.label),
      subLabel: this.tr(item.description),
      hint: this.tr(item.hint),
      defaultValue: item.default,
      // component props:
      options: item.options.map(opt => {
        return {
          value: opt.value,
          label: this.tr(opt.label)
        }
      }),
      multiple: true
    }
  }
}

export { SelectBItem, MultiSelectBItem, AutocompleteBItem, MultiAutocompleteBItem }