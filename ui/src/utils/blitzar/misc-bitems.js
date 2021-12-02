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
            id: (prefix + item.name).replaceAll('.', '_').toLowerCase(),
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

class ComputedBItem extends BItem {

  isFor(type) {
      return type === 'computed'
  }

  makeBItem(item, prefix) {
    const id = prefix + item.name
    const bcompute = BItem.variableRefRewrite(item.compute)
    const script = `{
      try {
        const rval = (${bcompute})
        if (val !== rval) { updateField({ id: '${id}', value: rval }) }
        return rval
      } catch (err) {
        return val
      }
    }`
    return {
      id: id,
      component: 'div',
      parseValue: new Function('return (val, { formData, updateField }) => ' + script)(),
      showCondition: false
    }
  }
}

export { SectionBItem, ComputedBItem }
