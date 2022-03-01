import BItem from './bitem'

class MapBItem extends BItem {

    isFor(type) {
        return type === 'map'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QAMap',
            label: this.tr(item.label),
            subLabel: this.tr(item.description),
            defaultValue: item.default,
            labelClasses: item.labelClass,
            multiple: item.multiple,
            geometryType: item.geometryType
        }
    }
}

export { MapBItem }
