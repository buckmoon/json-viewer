import React from 'react'
import PropTypes from 'prop-types'

function TabContainer({ children, value }) {
  return React.Children.toArray(children).find(
    (child, index) => index === value
  )
}

TabContainer.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired
}

export default TabContainer
