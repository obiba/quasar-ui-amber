import { h, ref } from 'vue'
import { QSelect } from 'quasar'

/*
<q-select
    filled
    v-model="model"
    use-input
    use-chips
    multiple
    input-debounce="0"
    @new-value="createValue"
    :options="filterOptions"
    @filter="filterFn"
/>
*/

export default {
  name: 'QAAutocomplete',
  props: {
    modelValue: [String, Array],
    options: Array,
    multiple: Boolean,
    newValue: Boolean
  },
  emits: ['update:modelValue', 'new-value'],
  
  setup(props, { emit }) {
    const filterOptions = ref([])

    const filterFn = (val, update) => {
        update(() => {
            if (val.length < 2) {
                filterOptions.value = []
            }
            else {
                const needle = val.toLowerCase()
                filterOptions.value = props.options.filter(v => v.label.toLowerCase().indexOf(needle) > -1).slice(0, 10)
            }
        })
    }

    const createValueFn = (val, done) => {
        if (val.length > 2) {
            if (!props.options.map(o => o.value).includes(val)) {
                done(val, 'add-unique')
            }
        }
    }

    return () => {

      const opts = {
        modelValue: props.modelValue,
        'onUpdate:modelValue': value => emit('update:modelValue', value),
        'use-input': true,
        'use-chips': props.multiple,
        'emit-value': true,
        'map-options': true,
        'input-debounce': '0',
        'hide-dropdown-icon': true,
        clearable: true,
        multiple: props.multiple,
        options: filterOptions.value,
        onFilter: filterFn,
        class: 'qa-autocomplete'
      }
      if (props.newValue) {
        opts.onNewValue = createValueFn
      }

      // console.log(opts)

      return h(QSelect, opts)
    }
  }
}

