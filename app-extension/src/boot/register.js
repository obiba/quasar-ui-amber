import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-amber-form-ui'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
