import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import GitHubIcon from './GitHubIcon'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  root: {
    boxShadow: 'none'
  },
  title: {
    flexGrow: 1
  }
}

function Header({ classes }) {
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" className={classes.title}>
          JSON Viewer
        </Typography>
        <Tooltip title="GitHub Repository">
          <IconButton
            color="inherit"
            component="a"
            href="https://github.com/buckmoon/json-viewer">
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
