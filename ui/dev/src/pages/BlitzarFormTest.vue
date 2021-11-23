<template>
  <q-page padding>
    <div>
      <BlitzForm :key='remountCounter' :schema='generatedSchema' v-model='model' :columnCount='1' gridGap='32px'/>
    </div>
    <div class="bg-black text-white q-mt-lg q-pa-md">
      <pre>{{ JSON.stringify(model, null, '  ') }}</pre>
    </div>
  </q-page>
</template>

<script>
import { BlitzForm } from '@blitzar/form'
import { ref } from 'vue'
import { makeBlitzarQuasarSchemaForm } from 'ui'

const schema = {
  items: [
    {
      name: 'DOB',
      type: 'date',
      label: 'Birth date?',
      description: 'The date of your birth'
    },
    {
      name: 'TRAUMA_DT',
      type: 'datetime',
      label: 'Date and time of trauma',
      description: 'Bla bla bla'
    },
    {
      name: 'TRAUMA_T',
      type: 'time',
      label: 'Time of the trauma?',
      description: 'At what time did it happened?'
    }
  ],
  i18n: {}
}

export default {
  components: { BlitzForm },
  setup () {
    return {
      remountCounter: 0,
      model: ref({}),
      generatedSchema: makeBlitzarQuasarSchemaForm(schema, { locale: 'en' })
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
