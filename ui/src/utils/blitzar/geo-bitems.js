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
            geometryType: item.geometryType,
            mapHeight: item.mapHeight,
            mapWidth: item.mapWidth,
            center: item.center,
            zoom: item.zoom,
            geoLocation: item.geoLocation !== undefined ? item.geoLocation : true
        }
    }
}

export { MapBItem }
