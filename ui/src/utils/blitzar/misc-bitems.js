import BItem from './bitem'

class SectionBItem extends BItem {

    isFor(type) {
        return type === 'section'
    }

    makeBItem(item, prefix) {
      return {
        id: prefix + item.name,
        component: 'QASection',
        identifier: (prefix + item.name).replaceAll('.', '_').toLowerCase(),
        head: this.tr(item.label),
        headClass: item.labelClass,
        body: this.trmd(item.description),
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
        function map(oldValue, mapping, undefValue) {
          if (oldValue === undefined) {
            return undefValue
          }
          if (Array.isArray(oldValue)) {
            return oldValue.map(val => map(val, mapping, undefValue))
          }
          if (Array.isArray(mapping)) {
            for (let i = 0; i < mapping.length - 1; i++) {
              let stop = mapping[i]
              let val = mapping[i+1]
              if (i === mapping.length - 2) {
                if (oldValue >= stop) return val
              } else if (oldValue < stop) {
                return val
              }
              i++
            }
          } else if (mapping instanceof Object) {
            for (const key in mapping) {
              if (key === oldValue.toString()) {
                return mapping[key]
              }
            }
            if (Object.hasOwn(mapping, '*')) {
              return mapping['*']
            }
          }
          return oldValue
        }
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
