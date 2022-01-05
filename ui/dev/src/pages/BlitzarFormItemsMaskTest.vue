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
      name: 'TEXT',
      type: 'text',
      label: 'No mask'
    },
    {
      name: 'TEXTALL',
      type: 'text',
      label: 'Mask ##-SS-NN-AA-aa-XX-xx',
      mask: '##-SS-NN-AA-aa-XX-xx'
    },
    {
      name: 'TEXTNUMBER',
      type: 'text',
      label: 'Mask ####-####',
      mask: '####-####'
    },
    {
      name: 'TEXTPHONE',
      type: 'text',
      label: 'Mask phone',
      mask: 'phone'
    },
    {
      name: 'TEXTCARD',
      type: 'text',
      label: 'Mask card',
      mask: 'card'
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
