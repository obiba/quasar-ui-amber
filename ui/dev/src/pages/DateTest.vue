<template>
  <q-page padding>
    <QADate
      label="Some Date"
      placeholder="YYYY-MM-DD"
      hint="Select a date in ISO-8601 format."
      closeLabel="Close"
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
      model: ref('')
    }
  }
}
</script>
