import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Cancel'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { ObjectInspector } from 'react-inspector'
import get from 'lodash.get'

const styles = () => ({
  root: {
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'auto'
  },
  table: {
    minWidth: 700
  },
  head: {
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0
  },
  row: {
    height: 35
  },
  cell: {
    fontFamily: 'monospace',
    paddingTop: 10,
    paddingBottom: 10
  },
  cellFullWidth: {
    width: '100%'
  },
  iconButton: {
    padding: 5
  }
})

function WatcherTable({ classes, jsonStore, watcherStore }) {
  function getJsonObject(json) {
    try {
      return JSON.parse(json)
    } catch {
      return {}
    }
  }

  function createKeys() {
    const json = getJsonObject(jsonStore.json)
    return watcherStore.keys.map(key => ({
      key,
      value: get(json, key, undefined)
    }))
  }

  function handleClickRemove(index) {
    return () => {
      watcherStore.removeKeyAt(index)
    }
  }

  const keys = createKeys()

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} padding="dense">
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell className={classes.head}>Key</TableCell>
            <TableCell className={classes.head}>Value</TableCell>
            <TableCell
              className={classes.head}
              align="right"
              padding="checkbox"
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {keys.map(({ key, value }, idx) => (
            <TableRow className={classes.row} key={idx}>
              <TableCell component="th" scope="row" className={classes.cell}>
                {key}
              </TableCell>
              <TableCell className={`${classes.cell} ${classes.cellFullWidth}`}>
                <ObjectInspector data={value} />
              </TableCell>
              <TableCell align="right" padding="checkbox">
                <IconButton
                  className={classes.iconButton}
                  onClick={handleClickRemove(idx)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

WatcherTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles),
  inject(stores => ({
    watcherStore: stores.watcherStore,
    jsonStore: stores.jsonStore
  })),
  observer
)(WatcherTable)
