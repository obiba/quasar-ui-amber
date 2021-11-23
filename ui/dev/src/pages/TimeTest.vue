<template>
  <q-page padding>
    <QATime
      label="Some time"
      placeholder="HH:mm"
      hint="Select a time in 24h format."
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

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
