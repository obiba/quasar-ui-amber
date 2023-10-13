import BItem from './bitem'

class ToggleBItem extends BItem {

    isFor(type) {
        return type === 'toggle'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QToggle',
            label: this.tr(item.label),
            subLabel: this.trmd(item.description),
            defaultValue: item.default ? (item.default === 'true' ? true : false) : undefined,
            labelClasses: item.labelClass
        }
    }
}

export { ToggleBItem }