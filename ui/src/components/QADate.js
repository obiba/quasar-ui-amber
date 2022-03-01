import { h, withDirectives } from 'vue'
import { QInput, QIcon, QPopupProxy, QDate, QBtn, ClosePopup } from 'quasar'

/*
<q-input v-model="model"
  mask="####-##-##"
  :label="schema.label"
  :hint="schema.description">
  <template v-slot:append>
    <q-icon name="event" class="cursor-pointer">
      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
        <q-date v-model="model" mask="YYYY-MM-DD" minimal>
          <div class="row items-center justify-end">
            <q-btn v-close-popup :label="$t('close')" flat />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-icon>
  </template>
</q-input>
*/

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
