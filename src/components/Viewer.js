import React from 'react'
import compose from 'recompose/compose'
import { inject, observer } from 'mobx-react'
import SplitPane from 'react-split-pane'
import { Controlled as CodeMirror } from 'react-codemirror2'
import Inspector from './Inspector'

import 'codemirror/addon/display/autorefresh.js'
import 'codemirror/mode/javascript/javascript.js'

class Viewer extends React.Component {
  state = {
    text: this.props.jsonStore.text
  }

  handleBeforeChange = (editor, data, text) => {
    this.setState({ text })
  }

  handleChange = (editor, data, text) => {
    this.props.jsonStore.setText(text)
  }

  render() {
    const { paneStore, jsonStore } = this.props

    return (
      <div className="Viewer">
        <SplitPane
          split="horizontal"
          size={paneStore.mainPaneSize}
          defaultSize={paneStore.mainPaneSize}
          onChange={paneStore.setMainPaneSize}
          pane2Style={{ display: 'flex' }}>
          <SplitPane
            split="vertical"
            size={paneStore.viewerPaneSize}
            defaultSize={paneStore.viewerPaneSize}
            onChange={paneStore.setViewerPaneSize}
            pane2Style={{ display: 'flex', width: '50%' }}>
            <CodeMirror
              value={this.state.text}
              onBeforeChange={this.handleBeforeChange}
              onChange={this.handleChange}
              options={{
                lineWrapping: true,
                lineNumbers: true,
                mode: ''
              }}
            />
            <CodeMirror
              value={jsonStore.json}
              options={{
                lineNumbers: true,
                readOnly: true,
                mode: jsonStore.mode
              }}
            />
          </SplitPane>
          <Inspector />
        </SplitPane>
      </div>
    )
  }
}

export default compose(
  inject(stores => ({
    paneStore: stores.paneStore,
    jsonStore: stores.jsonStore
  })),
  observer
)(Viewer)
