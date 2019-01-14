import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import GitHubIcon from './GitHubIcon'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  root: {
    flexGrow: 0
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12
  }
}

class Header extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" className={classes.title}>
              JSON Viewer
            </Typography>
            <Tooltip title="See the source on GitHub">
              <IconButton
                color="inherit"
                component="a"
                href={`https://github.com/buckmoon/json-viewer`}>
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  inject(stores => ({
    paneStore: stores.paneStore
  })),
  observer
)(Header)
