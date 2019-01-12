import PaneStore from './PaneStore'
import JsonStore from './JsonStore'
import WatcherStore from './WatcherStore'
import store from 'store'
import json from '../assets/hello'

const stores = {
  paneStore: PaneStore.create({
    mainPaneSize: store.get(`main_pane_size`, '50%'),
    viewerPaneSize: store.get(`viewer_pane_size`, '50%')
  }),
  jsonStore: JsonStore.create({
    text: store.get('text', JSON.stringify(json))
  }),
  watcherStore: WatcherStore.create({
    keys: store.get('watch_keys', ['greetings[0].hello'])
  })
}

export default stores
