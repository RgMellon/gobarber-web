import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '../../assets/images/icon.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigratório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('e-mail obrigatório'),

  password: Yup.string()
    .required('Senha obrigatório')
    .min(6, 'Mínimo 6 caracteres'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit"> Criar conta </button>
        <Link to="/"> Já tenho o login </Link>
      </Form>
    </>
  );
}
