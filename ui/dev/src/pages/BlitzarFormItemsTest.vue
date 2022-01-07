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
    },
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
    },
    {
      name: 'GROUP',
      type: 'group',
      label: 'Group label',
      description: 'Group description',
      items: [
        {
          name: 'DATETIME',
          type: 'datetime',
          label: 'Datetime label',
          description: 'Datetime description',
          placeholder: 'Datetime placeholder',
          hint: 'Datetime hint',
          required: true
        },
        {
          name: 'TIME',
          type: 'time',
          label: 'Time label',
          description: 'Time description',
          placeholder: 'Time placeholder',
          hint: 'Time hint',
          required: true
        }
      ]
    },
    {
      name: 'RADIOGROUP',
      type: 'radiogroup',
      label: 'Radio group label',
      description: 'Radio group description',
      options: [
        {
          value: '1',
          label: 'male'
        },
        {
          value: '2',
          label: 'female'
        }
      ],
      required: true
    },
    {
      name: 'CHECKBOXGROUP',
      type: 'checkboxgroup',
      label: 'Checkbox group label',
      description: 'Checkbox group description',
      options: [
        {
          value: '1',
          label: 'bike'
        },
        {
          value: '2',
          label: 'car'
        },
        {
          value: '3',
          label: 'plane'
        }
      ],
      required: true
    },
    {
      name: 'SELECT',
      type: 'select',
      label: 'Select label',
      description: 'Select description',
      hint: 'Select hint',
      options: [
        {
          value: '1',
          label: 'NYC'
        },
        {
          value: '2',
          label: 'MTL'
        },
        {
          value: '3',
          label: 'LYS'
        }
      ],
      required: true
    },
    {
      name: 'MULTISELECT',
      type: 'select',
      label: 'Multiselect label',
      description: 'Multiselect description',
      hint: 'Multiselect hint',
      options: [
        {
          value: '1',
          label: 'cat'
        },
        {
          value: '2',
          label: 'dog'
        },
        {
          value: '3',
          label: 'alligator'
        }
      ],
      multiple: true,
      required: true
    },
    {
      name: 'AUTOCOMPLETE',
      type: 'autocomplete',
      label: 'Autocomplete label',
      description: 'Autocomplete description',
      hint: 'Autocomplete hint',
      options: [
        {
          value: '1',
          label: 'cat'
        },
        {
          value: '2',
          label: 'dog'
        },
        {
          value: '3',
          label: 'alligator'
        },
        {
          value: '4',
          label: 'elephant'
        }
      ],
      required: true
    },
    {
      name: 'MULTIAUTOCOMPLETE',
      type: 'autocomplete',
      label: 'Multiautocomplete label',
      description: 'Multiautocomplete description',
      hint: 'Multiautocomplete hint',
      options: [
        {
          value: '1',
          label: 'cat'
        },
        {
          value: '2',
          label: 'dog'
        },
        {
          value: '3',
          label: 'alligator'
        },
        {
          value: '4',
          label: 'elephant'
        }
      ],
      multiple: true,
      required: true
    },
    {
      name: 'TOGGLE',
      type: 'toggle',
      label: 'Toggle label',
      description: 'Toggle description',
      required: true
    },
    {
      name: 'SECTION',
      type: 'section',
      label: 'Section label',
      description: 'Section description',
      labelClass: 'text-h4',
      descriptionClass: 'text-caption text-grey-8'
    },
    {
      name: 'SLIDER',
      type: 'slider',
      label: 'Slider label',
      description: 'Slider description',
      min: 10,
      max: 20,
      format: '',
      required: true
    },
    {
      name: 'RATING',
      type: 'rating',
      label: 'Rating label',
      description: 'Rating description',
      max: 10,
      icon: 'stars',
      required: true
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
