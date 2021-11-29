import BItem from './bitem'


class SectionBItem extends BItem {

    isFor(type) {
        return type === 'section'
    }

    makeBItem(item, prefix) {
        return {
            id: prefix + item.name,
            component: 'div',
            slot: [
              {
                component: 'div',
                slot: this.tr(item.label),
                class: item.labelClass ? item.labelClass : 'text-h3'
              },
              {
                component: 'div',
                slot: this.tr(item.description),
                class: item.descriptionClass ? item.descriptionClass : 'text-subtitle1 text-grey-8'
              }
            ]
          }
    }
}

export { SectionBItem }
