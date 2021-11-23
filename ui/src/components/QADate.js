import { h } from 'vue'
import { QInput, QIcon, QPopupProxy, QDate } from 'quasar'

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
        prepend () {
          return h(QIcon, 
            {
              name: 'event',
              class: 'cursor-pointer'
            }, {
              default () {
                return h(QPopupProxy, 
                  {
                    transitionShow: 'scale',
                    transitionHide: 'scale'
                  }, {
                    default () {
                      return h(QDate, 
                        {
                          modelValue: props.modelValue,
                          'onUpdate:modelValue': value => emit('update:modelValue', value),
                          mask: 'YYYY-MM-DD',
                          minimal: true
                        }
                      )
                    }
                  }
                )
              }
            } 
          )
        }
      })
    }
  }
}
