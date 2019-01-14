import { types } from 'mobx-state-tree'
import store from 'store'
import debounce from 'lodash/debounce'

const stringify = text => {
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch ({ message }) {
    return message
  }
}

const JsonStore = types
  .model('JsonStore', {
    text: ''
  })
  .postProcessSnapshot(self => {
    store.set('text', self.text)
  })
  .actions(self => ({
    setText: debounce(text => self.debouncedSetText(text), 500),
    debouncedSetText(text) {
      self.text = text
    }
  }))
  .views(self => ({
    get json() {
      return stringify(self.text)
    },
    get mode() {
      try {
        return JSON.parse(self.text) && 'application/json'
      } catch {
        return ''
      }
    }
  }))

export default JsonStore
