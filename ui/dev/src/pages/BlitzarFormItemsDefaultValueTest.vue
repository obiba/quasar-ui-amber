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
      default: 'Default'
    },
    {
      name: 'TEXTAREA',
      type: 'textarea',
      label: 'Text area label',
      default: 'Default'
    },
    {
      name: 'NUMBER',
      type: 'number',
      label: 'Number label',
      default: '123'
    },
    {
      name: 'DATE',
      type: 'date',
      label: 'Date label',
      default: '2021-11-29'
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
          default: '2021-11-29 12:59'
        },
        {
          name: 'TIME',
          type: 'time',
          label: 'Time label',
          default: '13:15'
        }
      ]
    },
    {
      name: 'RADIOGROUP',
      type: 'radiogroup',
      label: 'Radio group label',
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
      default: '2'
    },
    {
      name: 'CHECKBOXGROUP',
      type: 'checkboxgroup',
      label: 'Checkbox group label',
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
      default: '3'
    },
    {
      name: 'CHECKBOXGROUP2',
      type: 'checkboxgroup',
      label: 'Checkbox group 2 label',
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
      default: "['3','2']"
    },
    {
      name: 'SELECT',
      type: 'select',
      label: 'Select label',
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
      default: '2'
    },
    {
      name: 'MULTISELECT',
      type: 'select',
      label: 'Multiselect label',
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
      default: '2'
    },
    {
      name: 'MULTISELECT2',
      type: 'select',
      label: 'Multiselect 2 label',
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
      default: '[\'2\',\'3\']'
    },
    {
      name: 'AUTOCOMPLETE',
      type: 'autocomplete',
      label: 'Autocomplete label',
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
      default: '2'
    },
    {
      name: 'MULTIAUTOCOMPLETE',
      type: 'autocomplete',
      label: 'Multiautocomplete label',
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
      default: '2'
    },
    {
      name: 'MULTIAUTOCOMPLETE2',
      type: 'autocomplete',
      label: 'Multiautocomplete 2 label',
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
      default: '[\'2\',\'3\']'
    },
    {
      name: 'TOGGLE',
      type: 'toggle',
      label: 'Toggle label',
      default: 'true'
    },
    {
      name: 'SECTION',
      type: 'section',
      label: 'Section label',
      labelClass: 'text-h4',
      descriptionClass: 'text-caption text-grey-8'
    },
    {
      name: 'SLIDER',
      type: 'slider',
      label: 'Slider label',
      min: 10,
      max: 20,
      format: '',
      default: '15'
    },
    {
      name: 'RATING',
      type: 'rating',
      label: 'Rating label',
      default: '2'
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
