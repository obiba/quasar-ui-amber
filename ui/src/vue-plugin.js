import QAAutocomplete from './components/QAAutocomplete'
import QADate from './components/QADate'
import QADatetime from './components/QADatetime'
import QAImageSelect from './components/QAImageSelect'
import QAMap from './components/QAMap'
import QATime from './components/QATime'
import { makeBlitzarQuasarSchemaForm, getBlitzarIdsAt, getBlitzarErrors } from './utils/blitzar'
import makeSchemaFormTr from './utils/i18n'
import { QIcon, QInput, QSlider, QSelect, QOptionGroup, QToggle, QRating } from 'quasar'
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

const version = __UI_VERSION__

function install (app) {
  app.component(QAAutocomplete.name, QAAutocomplete)
  app.component(QADate.name, QADate)
  app.component(QADatetime.name, QADatetime)
  app.component(QAImageSelect.name, QAImageSelect)
  app.component(QAMap.name, QAMap)
  app.component(QATime.name, QATime)
  app.component(QIcon.name, QIcon)
  app.component(QInput.name, QInput)
  app.component(QSlider.name, QSlider)
  app.component(QRating.name, QRating)
  app.component(QSelect.name, QSelect)
  app.component(QOptionGroup.name, QOptionGroup)
  app.component(QToggle.name, QToggle)
  app.use(OpenLayersMap)
}

export {
  version,
  QADate,
  QADatetime,
  QAImageSelect,
  QAMap,
  QATime,

  makeBlitzarQuasarSchemaForm,
  getBlitzarIdsAt,
  makeSchemaFormTr,
  getBlitzarErrors,

  install
}
