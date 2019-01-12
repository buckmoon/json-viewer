import { types } from 'mobx-state-tree'
import store from 'store'

const WatcherStore = types
  .model('WatcherStore', {
    keys: types.array(types.string)
  })
  .postProcessSnapshot(snapshot => {
    store.set('watch_keys', snapshot.keys)
  })
  .actions(self => ({
    addKey(key) {
      self.keys.push(key)
    },
    removeKeyAt(index) {
      self.keys = self.keys.filter((key, idx) => idx !== index)
    }
  }))

export default WatcherStore
