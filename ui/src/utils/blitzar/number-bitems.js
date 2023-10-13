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
            subLabel: this.trmd(item.description),
            hint: this.tr(item.hint),
            parseInput: Number,
            defaultValue: item.default ? Number.parseFloat(item.default) : undefined,
            labelClasses: item.labelClass
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
            subLabel: this.trmd(item.description),
            defaultValue: item.default ? Number.parseFloat(item.default) : undefined,
            min: item.min ? item.min : 0,
            max: item.max ? item.max : 100,
            labelAlways: true,
            labelClasses: item.labelClass
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
            subLabel: this.trmd(item.description),
            hint: this.tr(item.hint),
            max: item.max ? item.max : 5,
            icon: item.icon ? item.icon : "star",
            color: item.color ? item.color : "primary",
            size: item.size ? item.size : "2em",
            parseValue: Number,
            defaultValue: item.default ? Number.parseFloat(item.default) : undefined,
            labelClasses: item.labelClass
        }
    }
}

export { NumberBItem, SliderBItem, RatingBItem }
