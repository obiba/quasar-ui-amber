import { h } from 'vue'
import { QInput, QIcon, QPopupProxy, QTime } from 'quasar'

/*
<q-input v-model="model"
  mask="##:##"
  :label="schema.label"
  :hint="schema.description">
  <template v-slot:append>
    <q-icon name="access_time" class="cursor-pointer">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-time v-model="model" mask="HH:mm" format24h>
          <div class="row items-center justify-end">
            <q-btn v-close-popup :label="$t('close')" color="primary" flat />
          </div>
        </q-time>
      </q-popup-proxy>
    </q-icon>
  </template>
</q-input>
*/

export default {
  name: 'QATime',
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
        mask: '##:##',
        clearable: true,
        clearIcon: 'close',
        class: 'qa-datetime'
      }, {
        prepend () {
          return h(QIcon, 
            {
              name: 'access_time',
              class: 'cursor-pointer'
            }, {
              default () {
                return h(QPopupProxy, 
                  {
                    transitionShow: 'scale',
                    transitionHide: 'scale'
                  }, {
                    default () {
                      return h(QTime, 
                        {
                          modelValue: props.modelValue,
                          'onUpdate:modelValue': value => emit('update:modelValue', value),
                          mask: 'HH:mm',
                          format24h: true
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
