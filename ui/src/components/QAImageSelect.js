import { h, ref, computed } from 'vue'
import { QSelect, QIcon } from 'quasar'

export default {
  name: 'QAImageSelect',
  props: {
    modelValue: [String, Array],
    options: Array,
    multiple: Boolean,
    imageSrc: String,
    imageClass: String,
    areas: Array,
    readonly: Boolean,
    disable: Boolean,
    hint: String,
    showSelect: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'new-value'],
  
  setup(props, { emit }) {
    
    const editable = computed(() =>
      props.readonly !== true && props.disable !== true
    )

    function set (value) {
      if (editable.value === true) {
        if (props.multiple) {
          const newVal = []
          if (props.modelValue) {
            newVal.push(...props.modelValue)
          }
          const idx = newVal.indexOf(value)
          if (idx === -1) {
            newVal.push(value)
          } else {
            newVal.splice(idx, 1)
          }
          emit('update:modelValue', newVal)
        } else {
          emit('update:modelValue', value === props.modelValue ? null : value)
        }
      }
    }

    const getOpacity = (value) => {
      if (props.multiple) {
        return props.modelValue && props.modelValue.includes(value) ? '0.6' : '0.2'
      } else {
        return props.modelValue === value ? '0.8' : '0.3'
      }
    }

    const getTitle = (value) => {
      return props.options.filter(opt => opt.value === value).map(opt => opt.label).pop()
    }

    const svgViewBox = ref('0 0 0 0')
    if (props.imageSrc) {
      const img = new Image();
      img.onload = () => {
        svgViewBox.value = `0 0 ${img.width} ${img.height}`
      }
      img.src = props.imageSrc
    }

    return () => {

      const wrapperChildren = []
      if (props.imageSrc) {
        const image = h('img', {
          style: 'max-width: 100%; max-height: 100%;',
          src: props.imageSrc
        })
        wrapperChildren.push(image)

        const areaLinks = props.areas ? props.areas.map(area => {
          return h('a', {
            href: 'javascript:void(0)'
          }, [
            h('polygon', {
              fill: area.fill,
              opacity: getOpacity(area.value),
              points: area.points,
              onClick () { set(area.value) }
            }, [
              h('title', {}, [ getTitle(area.value) ])
            ])
          ])
        }) : []
    
        const svgAttrs = {
          style: 'position: absolute;top: 0;right: 0;bottom: 0;left: 0;height: 100%;width: 100%;',
          viewBox: svgViewBox.value
        }
  
        const svg = h('svg', svgAttrs, areaLinks)

        wrapperChildren.push(svg)
      } else {
        wrapperChildren.push(h(QIcon, { name: 'image', size: 'xl', class: 'text-grey' }))
      }

      const wrapper = h('div', {
        class: 'q-mt-md',
        style: 'max-width: 100%; display: inline-block; position: relative'
      }, wrapperChildren)

      const children = [ wrapper ]

      if (props.showSelect) {
        children.push(h(QSelect, {
          modelValue: props.modelValue,
          'onUpdate:modelValue': value => emit('update:modelValue', value),
          'use-chips': props.multiple,
          'emit-value': true,
          'map-options': true,
          clearable: true,
          multiple: props.multiple,
          options: props.options,
          hint: props.hint
        }))
      } else if (props.hint) {
        children.push(h('div', {
          class: 'q-mt-sm text-grey text-caption'
        }, [ props.hint ]))
      }

      return h('div', {
        class: 'qa-image-select ' + (props.imageClass ? props.imageClass : ''),
      }, children)
    }
  }
}

