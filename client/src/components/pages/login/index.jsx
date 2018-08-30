import React from 'react'
import Input from '@/components/reusable/input'
import InputGroup from '@/components/reusable/input-group'
import Button from '@/components/reusable/button'
import InputPassword from '@/components/reusable/input-password'
import Title from '@/components/reusable/title'

const constructor = () => (
  <div>
    <Title size={ 1 }>Авторизация</Title>
    <InputGroup>
      <Input placeholder="Логин" required />
      <InputPassword placeholder="Пароль" required />
    </InputGroup>
    <Button fullwidth>Войти</Button>
  </div>
)

export default constructor
