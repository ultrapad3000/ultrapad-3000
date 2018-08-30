import React from 'react'
import Input from '@/components/reusable/input'
import InputGroup from '@/components/reusable/input-group'
import Button from '@/components/reusable/button'

const constructor = () => (
  <div>
    Register Page
    <InputGroup>
      <Input placeholder="Почта" type="email" required />
      <Input placeholder="Логин" required />
      <Input placeholder="Пароль" type="password" required />
    </InputGroup>
    <Button fullwidth>Зарегистрироваться</Button>
  </div>
)

export default constructor
