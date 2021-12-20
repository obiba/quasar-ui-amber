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
import { BlitzForm } from 'blitzar'
import { ref } from 'vue'
import { makeBlitzarQuasarSchemaForm } from 'ui'

const schema = {
  items: [
    {
      name: 'DISABLED',
      type: 'toggle',
      label: 'Toggle disabled label',
      description: 'Toggle disabled description'
    },
    {
      name: 'TEXT',
      type: 'text',
      label: 'Text label',
      description: 'Text description',
      placeholder: 'Text placeholder',
      hint: 'Text hint',
      disabled: 'formData.DISABLED'
    },
    {
      name: 'TEXTAREA',
      type: 'textarea',
      label: 'Text area label',
      description: 'Text area description',
      placeholder: 'Text area placeholder',
      hint: 'Text area hint',
      disabled: 'formData.DISABLED'
    },
    {
      name: 'NUMBER',
      type: 'number',
      label: 'Number label',
      description: 'Number description',
      hint: 'Number hint',
      disabled: 'formData.DISABLED'
    },
    {
      name: 'DATE',
      type: 'date',
      label: 'Date label',
      description: 'Date description',
      placeholder: 'Date placeholder',
      hint: 'Date hint',
      disabled: 'formData.DISABLED'
    },
    {
      name: 'GROUP',
      type: 'group',
      label: 'Group label',
      description: 'Group description',
      disabled: 'formData.DISABLED',
      items: [
        {
          name: 'DATETIME',
          type: 'datetime',
          label: 'Datetime label',
          description: 'Datetime description',
          placeholder: 'Datetime placeholder',
          hint: 'Datetime hint',
          disabled: 'formData.DISABLED'
        },
        {
          name: 'TIME',
          type: 'time',
          label: 'Time label',
          description: 'Time description',
          placeholder: 'Time placeholder',
          hint: 'Time hint',
          disabled: 'formData.DISABLED'
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
      disabled: 'formData.DISABLED'
    },
    {
      name: 'CHECKBOXGROUP',
      type: 'checkboxgroup',
      label: 'Checkbox group label',
      description: 'Checkbox group description',
      disabled: 'formData.DISABLED',
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
      ]
    },
    {
      name: 'SELECT',
      type: 'select',
      label: 'Select label',
      description: 'Select description',
      hint: 'Select hint',
      disabled: 'formData.DISABLED',
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
      ]
    },
    {
      name: 'MULTISELECT',
      type: 'multiselect',
      label: 'Multiselect label',
      description: 'Multiselect description',
      hint: 'Multiselect hint',
      disabled: 'formData.DISABLED',
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
      ]
    },
    {
      name: 'TOGGLE',
      type: 'toggle',
      label: 'Toggle label',
      description: 'Toggle description',
      disabled: 'formData.DISABLED'
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
      disabled: 'formData.DISABLED'
    },
    {
      name: 'RATING',
      type: 'rating',
      label: 'Rating label',
      description: 'Rating description',
      max: 10,
      icon: 'stars',
      disabled: 'formData.DISABLED'
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
