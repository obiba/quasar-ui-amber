import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'QADate',

  setup () {
    return () => h(QBadge, {
      class: 'QADate',
      label: 'QADate'
    })
  }
}
