import { types } from 'mobx-state-tree'
import store from 'store'

const PaneStore = types
  .model('PaneStore', {
    mainPaneSize: types.union(
      types.optional(types.string, '50%'),
      types.number
    ),
    viewerPaneSize: types.union(
      types.optional(types.string, '50%'),
      types.number
    )
  })
  .postProcessSnapshot(snapshot => {
    store.set('main_pane_size', snapshot.mainPaneSize)
    store.set(`viewer_pane_size`, snapshot.viewerPaneSize)
  })
  .actions(self => ({
    setMainPaneSize(size) {
      store.set(`main_pane_size`, size)
    },
    setViewerPaneSize(size) {
      store.set(`viewer_pane_size`, size)
    }
  }))

export default PaneStore
