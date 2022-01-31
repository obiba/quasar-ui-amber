import { h, ref, computed } from 'vue'
import { QSelect } from 'quasar'

export default {
  name: 'QAImageSelect',
  props: {
    modelValue: [String, Array],
    options: {
      type: Array,
      required:true
    },
    multiple: Boolean,
    imageSrc: {
      type: String,
      required: true
    },
    areas: {
      type: Array,
      required:true
    },
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

    const image = h('img', {
      style: 'max-width: 100%; max-height: 100%;',
      src: props.imageSrc
    })

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

    return () => {

      const areaLinks = props.areas.map(area => {
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
      })
  
      const svg = h('svg', {
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        preserveAspectRatio: 'xMinYMin meet',
        style: 'position: absolute;top: 0;right: 0;bottom: 0;left: 0;height: 100%;width: 100%;'
      }, areaLinks)

      const wrapper = h('div', {
        class: 'q-mt-md',
        style: 'max-width: 100%; display: inline-block; position: relative'
      }, [ image, svg ])

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
        class: 'qa-image-select',
      }, children)
    }
  }
}

