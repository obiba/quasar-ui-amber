<template>
  <q-page padding>
    <div class="text-h3">{{ tr(schema.label) }}</div>
    <div class="text-subtitle1">{{ tr(schema.description) }}</div>
    <div class="q-mt-md">
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
import { makeBlitzarQuasarSchemaForm, makeSchemaFormTr } from 'ui'

const schema = {
  label: "form_label",
  description: "form_description",
  items: [
    {
      name: "RADIOGROUP",
      type: "radiogroup",
      label: "radiogroup_label",
      description: "radiogroup_description",
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
      name: "TEXT",
      type: "text",
      label: "text_label",
      description: "text_description",
      placeholder: "text_placeholder",
      hint: "text_hint"
    },
    {
      name: "GROUP",
      type: "group",
      label: "group_label",
      description: "group_description",
      items: [
        {
          name: "DATETIME",
          type: "datetime",
          label: "datetime_label",
          description: "datetime_description",
          placeholder: "datetime_placeholder",
          hint: "datetime_hint",
        }
      ]
    }
  ],
  i18n: {
    en: {
      form_label: "Form label",
      form_description: "Form description",
      radiogroup_label: "Radio group label",
      radiogroup_description: "Radio group description",
      yes: "Yes",
      no: "No",
      other: "Other",
      text_label: "Text label",
      text_description: "Text description",
      text_placeholder: "Text placeholder",
      text_hint: "Text hint",
      group_label: "Group label",
      group_description: "Group description",
      datetime_label: "Datetime label",
      datetime_description: "Datetime description",
      datetime_placeholder: "Datetime placeholder",
      datetime_hint: "Datetime hint"
    },
    fr: {
      form_label: "Form label fr",
      form_description: "Form description fr",
      radiogroup_label: "Radio group label fr",
      radiogroup_description: "Radio group description fr",
      yes: "Oui",
      no: "Non",
      other: "Autre",
      text_label: "Text label fr",
      text_description: "Text description fr",
      text_placeholder: "Text placeholder fr",
      text_hint: "Text hint fr",
      group_label: "Group label fr",
      group_description: "Group description fr",
      datetime_label: "Datetime label fr",
      datetime_description: "Datetime description fr",
      datetime_placeholder: "Datetime placeholder fr",
      datetime_hint: "Datetime hint fr"
    }
  }
}

export default {
  components: { BlitzForm },
  setup () {
    return {
      remountCounter: 0,
      model: ref({}),
      schema,
      generatedSchema: makeBlitzarQuasarSchemaForm(schema, { locale: 'fr' }),
      tr: makeSchemaFormTr(schema, { locale: 'fr' })
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
