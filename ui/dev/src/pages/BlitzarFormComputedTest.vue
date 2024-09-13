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
      name: "FIRSTNAME",
      type: "text",
      label: "First name"
    },
    {
      name: "LASTNAME",
      type: "text",
      label: "Last name"
    },
    {
      name: "FULLNAME",
      type: "computed",
      compute: "(($('FIRSTNAME') || '') + ' ' + ($('LASTNAME') || '')).trim()"
    },
    {
      name: "FULLNAME_FUNC",
      type: "computed",
      compute: `() => {
        if ($('FIRSTNAME') && $('LASTNAME')) {
          return ($('FIRSTNAME').trim() + ' ' + $('LASTNAME').trim()).trim()
        } else if ($('FIRSTNAME')) {
          return $('FIRSTNAME').trim()
        } else if ($('LASTNAME')) {
          return $('LASTNAME').trim()
        } else {
          return ''
        }
      }`
    },
    {
      name: "NUM1",
      type: "number",
      label: "Number one"
    },
    {
      name: "NUM2",
      type: "number",
      label: "Number two"
    },
    {
      name: "SUM",
      type: "computed",
      compute: "($('NUM1') || 0) + ($('NUM2') || 0)"
    },
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
      name: "BOOL",
      type: "computed",
      compute: "$('BOOL1') && $('BOOL2')"
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
