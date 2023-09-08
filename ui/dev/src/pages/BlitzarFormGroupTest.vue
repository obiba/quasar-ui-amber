<template>
  <q-page padding>
    <div class="q-mb-md">
      <q-btn icon="done" @click="onValidate"/>
    </div>
    <div>
      <BlitzForm :key='remountCounter' :schema='generatedSchema' v-model='model' :columnCount='1' gridGap='32px'/>
    </div>
    <div v-if="errorsRemain" class="bg-red-6 text-white q-mt-lg q-pa-md">
      <pre>{{ JSON.stringify(errors, null, '  ') }}</pre>
    </div>
    <div class="bg-black text-white q-mt-lg q-pa-md">
      <pre>{{ JSON.stringify(model, null, '  ') }}</pre>
    </div>
  </q-page>
</template>

<script>
import { BlitzForm, validateFormPerSchema } from '@blitzar/form'
import { ref } from 'vue'
import { makeBlitzarQuasarSchemaForm, getBlitzarErrors } from 'ui'

const schema = {
  items: [
    {
      name: 'GROUPT',
      type: 'group',
      label: 'Group label',
      description: 'Group description',
      items: [
        {
          name: 'TEXT',
          type: 'text',
          label: 'Text label',
          description: 'Text description',
          placeholder: 'Text placeholder',
          hint: 'Text hint',
          required: true
        },
        {
          name: 'TEXTAREA',
          type: 'textarea',
          label: 'Text area label',
          description: 'Text area description',
          placeholder: 'Text area placeholder',
          hint: 'Text area hint',
          required: true
        }
      ]
    },
    {
      name: 'GROUPN',
      type: 'group',
      label: '',
      items: [
        {
          name: 'NUMBER',
          type: 'number',
          label: 'Number label',
          description: 'Number description',
          hint: 'Number hint',
          required: true
        },
        {
          name: 'DATE',
          type: 'date',
          label: 'Date label',
          description: 'Date description',
          placeholder: 'Date placeholder',
          hint: 'Date hint',
          required: true
        }
      ]
    },
    {
      name: 'GROUPA',
      type: 'group',
      label: 'Group A',
      items: [
        {
          name: 'GROUPB',
          type: 'group',
          label: 'Group B',
          items: [
            {
              name: 'TEXTB',
              type: 'text',
              label: 'Text B label',
              required: true
            },
            {
              name: 'GROUPC',
              type: 'group',
              label: 'Group C',
              items: [
                {
                  name: 'NUMBERC',
                  type: 'number',
                  label: 'Number C label',
                  required: true
                }       
              ]
            }   
          ]
        },
        {
          name: 'TEXTA',
          type: 'text',
          label: 'Text A label',
          required: true
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
      errorsRemain: ref(false),
      errors: ref([]),
      model: ref({}),
      generatedSchema: makeBlitzarQuasarSchemaForm(schema, { locale: 'en', debug: true })
    }
  },
  methods: {
    onValidate () {
      const result = validateFormPerSchema(this.model, this.generatedSchema)
      this.errors = getBlitzarErrors(this.generatedSchema, result)
      this.errorsRemain = this.errors.length > 0
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
