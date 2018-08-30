import React from 'react'
import Type from 'prop-types'

import styles from './index.module.sass'

const constructor = (props) => {
  const classes = [styles.root]

  if (props.fullwidth) {
    classes.push(styles.root_fullwidth)
  }

  return (
    <button className={ classes.join(' ') }>
      { props.children }
    </button>
  )
}

constructor.propTypes = {
  children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
  fullwidth: Type.bool
}

constructor.defaultProps = {
  children: [],
  fullwidth: false
}

export default constructor
