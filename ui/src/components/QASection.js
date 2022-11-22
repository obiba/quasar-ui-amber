import { h } from 'vue'
import snarkdown from 'snarkdown'

export default {
  name: 'QASection',
  props: {
    head: String,
    headClass: String,
    body: String,
    bodyClass: String
  },
  setup(props) {
    return () => {
      const children = []
      if (props.head) {
        children.push(h('div', {
          class: props.headClass ? props.headClass : 'text-h4',
          innerHTML: props.head
        }))
      }

      if (props.body) {
        const defaultBodyClass = 'text-subtitle1 text-grey-8' + (props.head ? ' q-mt-md' : '')
        children.push(h('div', {
          class: props.bodyClass ? props.bodyClass : defaultBodyClass,
          innerHTML: snarkdown(props.body)
        }))
      }

      return h('div', {
        class: 'qa-section'
      }, children)
    }
  }
}