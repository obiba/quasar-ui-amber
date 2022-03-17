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

// data:application/jpg;base64,...

const schema = {
  items: [
    {
      name: 'MAP_POINT_DEFAULT',
      type: 'map',
      label: 'Point with default label',
      description: 'Geo map, with a default',
      hint: 'Geo map hint',
      multiple: false,
      geometryType: 'Point',
      defaultValue: '{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [ -74.18465727715618, 46.03587230951427 ] }, "properties": null }'
    },
    {
      name: 'MAP_POINTS_DEFAULT',
      type: 'map',
      label: 'Points with default label',
      description: 'Geo map, with default array',
      hint: 'Geo map hint',
      multiple: true,
      geometryType: 'Point',
      defaultValue: '[{"type": "Feature","geometry": {"type": "Point","coordinates": [6.88000498734131,45.9369013005249]},"properties": null},{"type": "Feature","geometry": {"type": "Point","coordinates": [6.894682035070802,45.94273778734131]},"properties": null}]'
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
  },
  methods: {
    onAreaClick (area) {
      console.log(area)
    }
  }
}
</script>
