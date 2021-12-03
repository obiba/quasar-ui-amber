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
import { makeBlitzarQuasarSchemaForm } from 'ui'

const schema = {
  items: [
    {
      name: "TEXT",
      type: "text",
      label: "Text label",
      description: "Text description",
      placeholder: "Text placeholder",
      hint: "Text hint",
      required: "true",
      validation: "val && val.length > 3",
      validationMessage: "Text is required and must have a minimum length of 4 chars."
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
      errors: ref({}),
      model: ref({}),
      generatedSchema: makeBlitzarQuasarSchemaForm(schema, { locale: 'en' })
    }
  },
  methods: {
    onValidate () {
      const result = validateFormPerSchema(this.model, this.generatedSchema)
      console.log(result)
      this.errors = Object.keys(result)
        .filter(key => result[key] !== null)
        .reduce((obj, key) => {
          obj[key] = result[key];
          return obj;
        }, {})
      this.errorsRemain = this.errors && Object.keys(this.errors).length > 0
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
