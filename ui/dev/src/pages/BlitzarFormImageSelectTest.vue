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
      name: 'IMAGE_BROKEN',
      type: 'image-select',
      label: 'Image broken label',
      description: 'Image map, without image',
      hint: 'Image map hint',
      options: [
        {
          value: '1',
          label: 'Face Left'
        },
        {
          value: '2',
          label: 'Face Right'
        },
        {
          value: '3',
          label: 'Back Left'
        },
        {
          value: '4',
          label: 'Back Right'
        }
      ],
      multiple: false,
      imageClass: 'text-center'
    },
    {
      name: 'IMAGE',
      type: 'image-select',
      label: 'Image map label',
      description: 'Image map, single selection',
      hint: 'Image map hint',
      options: [
        {
          value: '1',
          label: 'Face Left'
        },
        {
          value: '2',
          label: 'Face Right'
        },
        {
          value: '3',
          label: 'Back Left'
        },
        {
          value: '4',
          label: 'Back Right'
        }
      ],
      multiple: false,
      imageSrc: 'https://www.researchgate.net/profile/Robert-Hristovski/publication/282346406/figure/fig2/AS:341573754736648@1458448937402/Body-map-Head-area-1-2-23-or-24-neck-area-3-or-25-shoulders-area-4-5-26_W640.jpg',
      imageClass: 'text-center',
      areas: [
        {
          value: '1',
          fill: '#ccc',
          points: '0,0 150,0 150,750, 0,750'
        },
        {
          value: '2',
          fill: '#f8bbd0',
          points: '150,0 300,0 300,750, 150,750'
        },
        {
          value: '3',
          fill: '#c8e6c9',
          points: '345,0 495,0 495,750, 345,750'
        },
        {
          value: '4',
          fill: '#ffe0b2',
          points: '495,0 645,0 645,750, 495,750'
        }
      ]
    },
    {
      name: 'IMAGE_MULTIPLE',
      type: 'image-select',
      label: 'Image map multiple label',
      description: 'Image map, multiple selections',
      hint: 'Image map multiple hint',
      options: [
        {
          value: '1',
          label: 'Face Left'
        },
        {
          value: '2',
          label: 'Face Right'
        },
        {
          value: '3',
          label: 'Back Left'
        },
        {
          value: '4',
          label: 'Back Right'
        }
      ],
      multiple: true,
      imageSrc: 'https://www.researchgate.net/profile/Robert-Hristovski/publication/282346406/figure/fig2/AS:341573754736648@1458448937402/Body-map-Head-area-1-2-23-or-24-neck-area-3-or-25-shoulders-area-4-5-26_W640.jpg',
      areas: [
        {
          value: '1',
          fill: '#ccc',
          points: '0,0 150,0 150,750, 0,750'
        },
        {
          value: '2',
          fill: '#f8bbd0',
          points: '150,0 300,0 300,750, 150,750'
        },
        {
          value: '3',
          fill: '#c8e6c9',
          points: '345,0 495,0 495,750, 345,750'
        },
        {
          value: '4',
          fill: '#ffe0b2',
          points: '495,0 645,0 645,750, 495,750'
        }
      ]
    },
    {
      name: 'IMAGE2',
      type: 'image-select',
      label: 'Image map label',
      description: 'Image map, single selection, with overlapping areas',
      hint: 'Image map hint',
      options: [
        {
          value: '1',
          label: 'Left'
        },
        {
          value: '2',
          label: 'Right'
        }
      ],
      multiple: false,
      imageSrc: 'https://www.researchgate.net/profile/Robert-Hristovski/publication/282346406/figure/fig2/AS:341573754736648@1458448937402/Body-map-Head-area-1-2-23-or-24-neck-area-3-or-25-shoulders-area-4-5-26_W640.jpg',
      areas: [
        {
          value: '1',
          fill: '#ccc',
          points: '0,0 150,0 150,750, 0,750'
        },
        {
          value: '2',
          fill: '#f8bbd0',
          points: '150,0 300,0 300,750, 150,750'
        },
        {
          value: '1',
          fill: '#c8e6c9',
          points: '345,0 495,0 495,750, 345,750'
        },
        {
          value: '2',
          fill: '#ffe0b2',
          points: '495,0 645,0 645,750, 495,750'
        }
      ]
    },
    {
      name: 'IMAGE3',
      type: 'image-select',
      label: 'Image map label',
      description: 'Image map, single selection, without select component',
      hint: 'Image map hint',
      showSelect: false,
      options: [
        {
          value: '1',
          label: 'Face Left'
        },
        {
          value: '2',
          label: 'Face Right'
        },
        {
          value: '3',
          label: 'Back Left'
        },
        {
          value: '4',
          label: 'Back Right'
        }
      ],
      multiple: false,
      imageSrc: 'https://www.researchgate.net/profile/Robert-Hristovski/publication/282346406/figure/fig2/AS:341573754736648@1458448937402/Body-map-Head-area-1-2-23-or-24-neck-area-3-or-25-shoulders-area-4-5-26_W640.jpg',
      areas: [
        {
          value: '1',
          fill: '#ccc',
          points: '0,0 150,0 150,750, 0,750'
        },
        {
          value: '2',
          fill: '#f8bbd0',
          points: '150,0 300,0 300,750, 150,750'
        },
        {
          value: '3',
          fill: '#c8e6c9',
          points: '345,0 495,0 495,750, 345,750'
        },
        {
          value: '4',
          fill: '#ffe0b2',
          points: '495,0 645,0 645,750, 495,750'
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

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
