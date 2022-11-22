import BItem from './bitem'

class SectionBItem extends BItem {

    isFor(type) {
        return type === 'section'
    }

    makeBItem(item, prefix) {
      return {
        id: prefix + item.name,
        component: 'QASection',
        head: this.tr(item.label),
        headClass: item.labelClass,
        body: this.tr(item.description),
        bodyClass: item.descriptionClass
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
