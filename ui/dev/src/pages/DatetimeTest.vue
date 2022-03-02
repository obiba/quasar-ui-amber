<template>
  <q-page padding>
    <QADatetime
      label="Some Date and Time"
      placeholder="YYYY-MM-DD HH:mm"
      hint="Select a date in ISO-8601 format and time in 24h format."
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
