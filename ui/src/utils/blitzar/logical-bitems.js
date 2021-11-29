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
            subLabel: this.tr(item.description)
        }
    }
}

export { ToggleBItem }