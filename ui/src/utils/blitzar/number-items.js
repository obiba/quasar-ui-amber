import BItem from './bitem'

class NumberBItem extends BItem {

    isFor(type) {
        return type === 'number'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QInput',
            type: 'number',
            label: this.tr(item.label),
            subLabel: this.tr(item.description),
            hint: this.tr(item.hint),
            parseInput: Number
        }
    }
}

class SliderBItem extends BItem {

    isFor(type) {
        return type === 'slider'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QSlider',
            label: this.tr(item.label),
            subLabel: this.tr(item.description),
            defaultValue: item.default,
            // component props:
            min: item.min ? item.min : 0,
            max: item.max ? item.max : 100,
            labelAlways: true
        }
    }
}

class RatingBItem extends BItem {

    isFor(type) {
        return type === 'rating'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QRating',
            label: this.tr(item.label),
            subLabel: this.tr(item.description),
            hint: this.tr(item.hint),
            // component props:
            max: item.max ? item.max : 5,
            icon: item.icon ? item.icon : "star",
            color: item.color ? item.color : "primary",
            size: item.size ? item.size : "2em",
            parseValue: Number
        }
    }
}

export { NumberBItem, SliderBItem, RatingBItem }
