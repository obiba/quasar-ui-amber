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
      name: "RADIOGROUP",
      type: "radiogroup",
      label: "Radio group label",
      description: "Radio group description",
      options: [ 
        {
          value: "1",
          label: "yes"
        }, 
        {
          value: "2",
          label: "no"
        }, 
        {
          value: "3",
          label: "other"
        }
      ]
    }, 
    {
      name: "TEXT",
      type: "text",
      label: "Text label",
      description: "Text description",
      placeholder: "Text placeholder",
      hint: "Text hint",
      condition: "formData.RADIOGROUP === '3'"
    },
    {
      name: "GROUP",
      type: "group",
      label: "Group label",
      description: "Group description",
      condition: "formData.RADIOGROUP === '2'",
      items: [
        {
          name: "DATETIME",
          type: "datetime",
          label: "Datetime label",
          description: "Datetime description",
          placeholder: "Datetime placeholder",
          hint: "Datetime hint",
        },
        {
          name: "TIME",
          type: "time",
          label: "Time label",
          description: "Time description",
          placeholder: "Time placeholder",
          hint: "Time hint",
          condition: "formData.RADIOGROUP === '2'"
        }
      ]
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
