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
      name: 'MAP_POINT',
      type: 'map',
      label: 'Point label',
      description: 'Geo map, with point, no center + geolocation',
      hint: 'Geo map hint',
      multiple: false,
      geometryType: 'Point',
      mapHeight: '600px',
      mapWidth: '600px'
    },
    {
      name: 'MAP_POLYGON',
      type: 'map',
      label: 'Polygon label',
      description: 'Geo map, with polygon, center + no geolocation',
      hint: 'Geo map hint',
      multiple: false,
      geometryType: 'Polygon',
      center: '[-73.55,45.55]',
      zoom: 8,
      geoLocation: false
    },
    {
      name: 'MAP_POINTS',
      type: 'map',
      label: 'Points label',
      description: 'Geo map, with points, center + geolocation',
      hint: 'Geo map hint',
      multiple: true,
      geometryType: 'Point',
      center: [40,40]
    },
    {
      name: 'MAP_POLYGONS',
      type: 'map',
      label: 'Polygons label',
      description: 'Geo map, with polygons, no center + no geolocation',
      hint: 'Geo map hint',
      multiple: true,
      geometryType: 'Polygon',
      geoLocation: false
    }
  ],
  i18n: {}
}

export default {
  components: { BlitzForm },
  setup () {
    return {
      remountCounter: 0,
      model: ref({
        "MAP_POINT": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              6.8847256752075205,
              45.93814584550781
            ]
          },
          "properties": null
        },
        "MAP_POINTS": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                6.88000498734131,
                45.9369013005249
              ]
            },
            "properties": null
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                6.894682035070802,
                45.94273778734131
              ]
            },
            "properties": null
          }
        ]
      }),
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
