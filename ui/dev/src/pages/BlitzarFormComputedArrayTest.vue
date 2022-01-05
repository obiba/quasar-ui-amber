<template>
  <q-page padding>
    <div>
      <BlitzForm :key='remountCounter' :schema='generatedSchema' v-model='model' :columnCount='2' gridGap='32px'/>
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
      name: "BOOL1",
      type: "toggle",
      label: "Bool one"
    },
    {
      name: "BOOL2",
      type: "toggle",
      label: "Bool two"
    },
    {
      name: "BOOLARRAY",
      type: "computed",
      compute: "[$('BOOL1'), $('BOOL2')]"
    },
    {
      name: "SELECT",
      type: "select",
      label: "Select",
      multiple: true,
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
      name: "SELECTMAP",
      type: "computed",
      compute: "$('SELECT').map(v => v === '1' ? true : false)"
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
