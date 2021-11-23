import { boot } from 'quasar/wrappers'
import VuePlugin from '@obiba/quasar-ui-amber'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
