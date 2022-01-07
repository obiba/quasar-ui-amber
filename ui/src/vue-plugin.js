import QAAutocomplete from './components/QAAutocomplete'
import QADate from './components/QADate'
import QADatetime from './components/QADatetime'
import QATime from './components/QATime'
import { makeBlitzarQuasarSchemaForm, getBlitzarIdsAt, getBlitzarErrors } from './utils/blitzar'
import makeSchemaFormTr from './utils/i18n'
import { QInput, QSlider, QSelect, QOptionGroup, QToggle, QRating } from 'quasar'

const version = __UI_VERSION__

function install (app) {
  app.component(QAAutocomplete.name, QAAutocomplete)
  app.component(QADate.name, QADate)
  app.component(QADatetime.name, QADatetime)
  app.component(QATime.name, QATime)
  app.component(QInput.name, QInput)
  app.component(QSlider.name, QSlider)
  app.component(QRating.name, QRating)
  app.component(QSelect.name, QSelect)
  app.component(QOptionGroup.name, QOptionGroup)
  app.component(QToggle.name, QToggle)
}

export {
  version,
  QADate,
  QADatetime,
  QATime,

  makeBlitzarQuasarSchemaForm,
  getBlitzarIdsAt,
  makeSchemaFormTr,
  getBlitzarErrors,

  install
}
