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
      label: 'Text label',
      description: 'Text description',
      placeholder: 'Text placeholder',
      hint: 'Text hint'
    },
    {
      name: 'TEXTAREA',
      type: 'textarea',
      label: 'Text area label',
      description: 'Text area description',
      placeholder: 'Text area placeholder',
      hint: 'Text area hint'
    },
    {
      name: 'NUMBER',
      type: 'number',
      label: 'Number label',
      description: 'Number description',
      hint: 'Number hint',
      default: '123'
    },
    {
      name: 'DATE',
      type: 'date',
      label: 'Date label',
      description: 'Date description',
      placeholder: 'Date placeholder',
      hint: 'Date hint'
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
          hint: 'Datetime hint'
        },
        {
          name: 'TIME',
          type: 'time',
          label: 'Time label',
          description: 'Time description',
          placeholder: 'Time placeholder',
          hint: 'Time hint'
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
      ]
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
      ]
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
      ]
    },
    {
      name: 'MULTISELECT',
      type: 'multiselect',
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
      ]
    },
    {
      name: 'TOGGLE',
      type: 'toggle',
      label: 'Toggle label',
      description: 'Toggle description'
    },
    {
      name: 'STATIC',
      type: 'static',
      label: 'Static label',
      description: 'Static description',
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
      format: ''
    },
    {
      name: 'RATING',
      type: 'rating',
      label: 'Rating label',
      description: 'Rating description',
      max: 10,
      icon: 'stars'
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
