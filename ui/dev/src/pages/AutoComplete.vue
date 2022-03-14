<template>
  <q-page padding>
    <QAAutocomplete
      label="Autocomplete label"
      hint="Type at least 2 letters."
      :options="options"
      multiple
      new-value
      v-model="model"
    />
    <div class="bg-black text-white q-mt-lg q-pa-md">
      <pre>{{ JSON.stringify(model, null, '  ') }}</pre>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      model: ref([]),
      options: [
        {
          label: 'Google',
          value: 'Google'
        },
        {
          label: 'Facebook',
          value: 'Facebook'
        },
        {
          label: 'Twitter',
          value: 'Twitter'
        },
        {
          label: 'Apple',
          value: 'Apple'
        },
        {
          label: 'Oracle',
          value: 'Oracle'
        }
      ]
    }
  }
}
</script>
