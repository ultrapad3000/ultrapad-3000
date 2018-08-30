import React from 'react'
import Input from '../input'

class InputPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      passVisable: false
    }
  }
  onIconClick = () => {
    this.setState({
      passVisable: !this.state.passVisable
    })
  }
  render () {
    const { passVisable } = this.state
    const type = passVisable ? 'text' : 'password'
    const icon = passVisable ? 'eye' : 'eye_off'

    return (
      <Input
        type={ type }
        iconId={ icon }
        onIconClick={ this.onIconClick }
        { ...this.props }
      />
    )
  }
}
export default InputPassword
