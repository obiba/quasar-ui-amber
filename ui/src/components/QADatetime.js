import { h, withDirectives } from 'vue'
import { QInput, QIcon, QPopupProxy, QDate, QTime, QBtn, ClosePopup } from 'quasar'

export default {
  name: 'QADatetime',
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
        mask: '####-##-## ##:##',
        clearable: true,
        clearIcon: 'close',
        class: 'qa-datetime'
      }, {
        prepend() {
          return [
            h(QIcon, {
              name: 'event',
              class: 'cursor-pointer'
            }, {
              default: () => [
                h(QPopupProxy,
                  {
                    transitionShow: 'scale',
                    transitionHide: 'scale'
                  }, {
                  default: () => [
                    h(QDate, {
                      modelValue: props.modelValue,
                      'onUpdate:modelValue': value => emit('update:modelValue', value),
                      mask: 'YYYY-MM-DD HH:mm',
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
            }
            ),
            h(QIcon, {
              name: 'access_time',
              class: 'cursor-pointer'
            }, {
              default: () => [
                h(QPopupProxy, {
                  transitionShow: 'scale',
                  transitionHide: 'scale'
                }, {
                  default: () => [
                    h(QTime, {
                      modelValue: props.modelValue,
                      'onUpdate:modelValue': value => emit('update:modelValue', value),
                      mask: 'YYYY-MM-DD HH:mm',
                      format24h: true
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
        }
      })
    }
  }
}
