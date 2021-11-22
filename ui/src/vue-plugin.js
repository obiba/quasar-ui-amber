import QADate from './components/QADate'


const version = __UI_VERSION__

function install (app) {
  app.component(QADate.name, QADate)

}

export {
  version,
  QADate,

  install
}
