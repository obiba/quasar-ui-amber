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
        subLabel: this.trmd(item.description),
        hint: this.tr(item.hint),
        defaultValue: item.multiple ? BItem.stringToArray(item.default) : item.default,
        options: item.options ? item.options.map(opt => {
          return {
            value: opt.value,
            label: this.tr(opt.label)
          }
        }) : [],
        'emit-value': true,
        'map-options': true,
        clearable: true,
        'use-chips': item.multiple,
        multiple: item.multiple,
        labelClasses: item.labelClass
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
      subLabel: this.trmd(item.description),
      hint: this.tr(item.hint),
      defaultValue: item.multiple ? BItem.stringToArray(item.default) : item.default,
      options: item.options ? item.options.map(opt => {
        return {
          value: opt.value,
          label: this.tr(opt.label)
        }
      }) : [],
      multiple: item.multiple,
      newValue: item.newValue,
      labelClasses: item.labelClass
    }
  }
}

class ImageSelectBItem extends BItem {
  
  isFor(type) {
    return type === 'image-select'
  }

  makeBItem(item, prefix) {
    return {
      id: prefix + item.name,
      component: 'QAImageSelect',
      label: this.tr(item.label),
      subLabel: this.trmd(item.description),
      hint: this.tr(item.hint),
      defaultValue: item.multiple ? BItem.stringToArray(item.default) : item.default,
      options: item.options ? item.options.map(opt => {
        return {
          value: opt.value,
          label: this.tr(opt.label)
        }
      }) : [],
      multiple: item.multiple,
      labelClasses: item.labelClass,
      imageSrc: item.imageSrc,
      imageClass: item.imageClass, 
      areas: item.areas,
      showSelect: item.showSelect
    }
  }
}

export { SelectBItem, AutocompleteBItem, ImageSelectBItem }