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
    multiple: Boolean
  },
  emits: ['update:modelValue', 'new-value'],
  
  setup(props, { emit }) {
    console.log(props)
    
    const filterOptions = ref([])

    const filterFn = (val, update) => {
        update(() => {
            if (val === '') {
                filterOptions.value = []
            }
            else {
                const needle = val.toLowerCase()
                filterOptions.value = props.options.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
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
      return h(QSelect, {
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
        onNewValue: createValueFn,
        class: 'qa-autocomplete'
      })
    }
  }
}

