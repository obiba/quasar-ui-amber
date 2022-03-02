import { h, withDirectives } from 'vue'
import { QInput, QIcon, QPopupProxy, QDate, QBtn, ClosePopup } from 'quasar'

export default {
  name: 'QADate',
  props: {
    modelValue: String,
    closeLabel: String
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // console.log(props)

    const controls = () => {
      const ctrls = []
      if (props.closeLabel) {
        ctrls.push(h('div', {
          class: 'row items-center justify-end q-gutter-sm'
        }, {
          default: () => [
            withDirectives(h(QBtn, {
              label: props.closeLabel,
              color: 'primary',
              flat: true
            }), [
              [ ClosePopup, true ]
            ])
          ]
        }))
      }
      return ctrls
    }

    return () => {
      return h(QInput, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': value => emit('update:modelValue', value),
        mask: '####-##-##',
        clearable: true,
        clearIcon: 'close',
        class: 'qa-date'
      }, {
        prepend: () => [
          h(QIcon, {
            name: 'event',
            class: 'cursor-pointer'
          }, {
            default: () => [
              h(QPopupProxy, {
                transitionShow: 'scale',
                transitionHide: 'scale'
              }, {
                default: () => [
                  h(QDate, {
                    modelValue: props.modelValue,
                    'onUpdate:modelValue': value => emit('update:modelValue', value),
                    mask: 'YYYY-MM-DD',
                    minimal: true
                  }, {
                    default: controls
                  })
                ]
              })
            ]
          })
        ]
      })
    }
  }
}
