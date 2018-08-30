import React from 'react'
import Type from 'prop-types'

import styles from './index.module.sass'

const constructor = ({ children }) => (
  <div className={ styles.root }>
    { children }
  </div>
)

constructor.propTypes = {
  children: Type.oneOfType([Type.arrayOf(Type.node), Type.node])
}

constructor.defaultProps = {
  children: []
}

export default constructor
