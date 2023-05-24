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
      name: "SELECT",
      type: "select",
      label: "Select",
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
      compute: "map($('SELECT'), {'1': true, '2': false, '*': undefined}, true)"
    },
    {
      name: "SELECTS",
      type: "select",
      label: "Selects",
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
      name: "SELECTMAPS",
      type: "computed",
      compute: "map($('SELECTS'), {'1': true, '2': false, '*': undefined}, true)"
    },
    {
      name: "BOOL",
      type: "toggle",
      label: "Bool one"
    },
    {
      name: "BOOLMAP",
      type: "computed",
      compute: "map($('BOOL'), {'true': 1, 'false': 0})"
    },
    {
      name: "NUM",
      type: "number",
      label: "Number one"
    },
    {
      name: "NUMMAP",
      type: "computed",
      compute: "map($('NUM'), [10, 0, 20, 1])"
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
