import React from 'react'
import Type from 'prop-types'
import styles from './index.module.sass'

const Title = props => React.createElement(
  `h${props.size}`,
  { className: styles.root },
  props.children
)

Title.propTypes = {
  size: Type.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: Type.oneOfType([Type.arrayOf(Type.node), Type.node])
}

Title.defaultProps = {
  children: []
}

export default Title
