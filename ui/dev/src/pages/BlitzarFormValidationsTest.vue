<template>
  <q-page padding>
    <div class="q-mb-md">
      <q-btn icon="done" @click="onValidate"/>
    </div>
    <div>
      <BlitzForm ref="form" :key='remountCounter' :schema='generatedSchema' v-model='model' :columnCount='1' :showErrorsOn="errorMode" gridGap='32px'/>
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
      name: "TEXT0",
      type: "text",
      label: "Text not required, with validation, no hint",
      required: false,
      validation: "val === undefined || val === null || val.length === 0 || val.length > 3",
      validationMessage: "Text is not required must have a minimum length of 4 chars."
    },
    {
      name: "TEXT",
      type: "text",
      label: "Text not required, with validation",
      hint: "Text hint",
      required: false,
      validation: "val === undefined || val === null || val.length === 0 || val.length > 3",
      validationMessage: "Text is not required must have a minimum length of 4 chars."
    },
    {
      name: "TEXT2",
      type: "text",
      label: "Text required, with validation",
      hint: "Text hint",
      required: true,
      validation: "val && val.length > 3",
      validationMessage: "Text is required and must have a minimum length of 4 chars."
    },
    {
      name: "TEXT21",
      type: "text",
      label: "Text required, with validation but no validation message",
      hint: "Text hint",
      required: true,
      validation: "val && val.length > 3"
    },
    {
      name: "TEXT22",
      type: "text",
      label: "Text required, with validation but with empty validation message",
      hint: "Text hint",
      required: true,
      validation: "val && val.length > 3",
      validationMessage: undefined
    },
    {
      name: "TEXT3",
      type: "text",
      label: "Text required, without validation",
      hint: "Text hint",
      required: true
    },
    {
      name: 'SELECT',
      type: 'select',
      label: 'Select required',
      hint: 'Select hint',
      required: true,
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
      type: 'select',
      label: 'Multiselect required',
      hint: 'Multiselect hint',
      required: true,
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
      multiple: true
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
      generatedSchema: makeBlitzarQuasarSchemaForm(schema, { locale: 'en', debug: true }),
      errorMode: ref('interaction')
    }
  },
  methods: {
    onValidate () {
      this.errorMode = 'always'
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
