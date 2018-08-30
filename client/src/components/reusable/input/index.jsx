import React from 'react'
import Type from 'prop-types'
import Icon from '../icon'
import styles from './index.module.sass'

const Input = ({ iconId, onIconClick, ...inputProps }) => (
  <div className={ styles.root }>
    <input className={ styles.input } { ...inputProps } />
    <span className={ styles.icon } onClick={ onIconClick } aria-hidden>
      { iconId &&
        <Icon
          id={ iconId }
          width={ 20 }
          height={ 20 }
        />
      }
    </span>
  </div>
)
Input.propTypes = {
  iconId: Type.string,
  onIconClick: Type.func
}
Input.defaultProps = {
  iconId: null,
  onIconClick: null
}
export default Input
