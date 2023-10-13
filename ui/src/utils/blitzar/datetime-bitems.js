import BItem from './bitem'

class DateBItem extends BItem {

    isFor(type) {
        return type === 'date'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QADate',
            label: this.tr(item.label),
            subLabel: this.trmd(item.description),
            placeholder: this.tr(item.placeholder),
            hint: this.tr(item.hint),
            parseInput: (val) => val !== null && val.length === 0 ? null : val,
            defaultValue: item.default,
            labelClasses: item.labelClass,
            closeLabel: item.closeLabel ? this.tr(item.closeLabel) : undefined
        }
    }
}

class DatetimeBItem extends BItem {

    isFor(type) {
        return type === 'datetime'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QADatetime',
            label: this.tr(item.label),
            subLabel: this.trmd(item.description),
            placeholder: this.tr(item.placeholder),
            hint: this.tr(item.hint),
            parseInput: (val) => val !== null && val.length === 0 ? null : val,
            defaultValue: item.default,
            labelClasses: item.labelClass,
            closeLabel: item.closeLabel ? this.tr(item.closeLabel) : undefined
        }
    }
}


class TimeBItem extends BItem {

    isFor(type) {
        return type === 'time'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'QATime',
            label: this.tr(item.label),
            subLabel: this.trmd(item.description),
            placeholder: this.tr(item.placeholder),
            hint: this.tr(item.hint),
            parseInput: (val) => val !== null && val.length === 0 ? null : val,
            defaultValue: item.default,
            labelClasses: item.labelClass,
            closeLabel: item.closeLabel ? this.tr(item.closeLabel) : undefined
        }
    }
}

export { DateBItem, DatetimeBItem, TimeBItem }