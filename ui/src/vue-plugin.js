import QADate from './components/QADate'
import QADatetime from './components/QADatetime'
import QATime from './components/QATime'
import makeBlitzarQuasarSchemaForm from './utils/blitzar'

const version = __UI_VERSION__

function install (app) {
  app.component(QADate.name, QADate)
  app.component(QADatetime.name, QADatetime)
  app.component(QATime.name, QATime)
}

export {
  version,
  QADate,
  QADatetime,
  QATime,

  makeBlitzarQuasarSchemaForm,

  install
}
