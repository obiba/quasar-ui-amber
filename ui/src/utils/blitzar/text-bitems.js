import BItem from './bitem'

class TextBItem extends BItem {

    isFor(type) {
        return type === 'text'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QInput',
            label: this.tr(item.label),
            subLabel: this.tr(item.description),
            placeholder: this.tr(item.placeholder),
            hint: this.tr(item.hint),
            defaultValue: item.default,
            mask: item.mask,
            labelClasses: item.labelClass
        }
    }
}
  
class TextAreaBItem extends BItem {

    isFor(type) {
        return type === 'textarea'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QInput',
            type: 'textarea',
            label: this.tr(item.label),
            subLabel: this.tr(item.description),
            placeholder: this.tr(item.placeholder),
            hint: this.tr(item.hint),
            defaultValue: item.default,
            labelClasses: item.labelClass
        }
    }
}

export { TextBItem, TextAreaBItem }
