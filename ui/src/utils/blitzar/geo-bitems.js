import BItem from './bitem'

class MapBItem extends BItem {

    isFor(type) {
        return type === 'map'
    }

    makeBItem(item, prefix) {
        console.log(item)
        return {
            id: prefix + item.name,
            component: 'QAMap',
            label: this.tr(item.label),
            subLabel: this.tr(item.description),
            defaultValue: typeof item.defaultValue === 'string' ? JSON.parse(item.defaultValue) : item.defaultValue,
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
