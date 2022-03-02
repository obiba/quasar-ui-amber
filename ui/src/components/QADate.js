import { h, withDirectives } from 'vue'
import { QInput, QIcon, QPopupProxy, QDate, QBtn, ClosePopup } from 'quasar'

export default {
  name: 'QADate',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // console.log(props)

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
                    default: () => [
                      h('div', {
                        class: 'row items-center justify-end q-gutter-sm'
                      }, {
                        default: () => [
                          withDirectives(h(QBtn, {
                            label: 'OK',
                            color: 'primary',
                            flat: true
                          }), [
                            [ ClosePopup, true ]
                          ])
                        ]
                      })
                    ]
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
