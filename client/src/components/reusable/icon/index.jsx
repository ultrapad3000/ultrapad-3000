import React from 'react'
import Type from 'prop-types'
import styles from './index.module.sass'

const Icon = props => (
  <i className={ styles.root }>
    <svg
      xlinkHref="http://www.w3.org/1999/xlink"
      width={ `${props.width}px` }
      height={ `${props.height}px` }
    >
      <use xlinkHref={ `#${props.id}` } />
    </svg>
    <span className={ styles.substrate } />
  </i>
)
Icon.propTypes = {
  width: Type.number,
  height: Type.number,
  id: Type.string.isRequired
}
Icon.defaultProps = {
  width: 20,
  height: 20
}
export default Icon
