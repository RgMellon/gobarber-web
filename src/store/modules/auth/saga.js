import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { sigInSuccess, signFail } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Falha ao logar');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(sigInSuccess(token, user));

    history.push('/dashboard');
  } catch (e) {
    toast.error('Verifique seus dados e tente novamente');
    yield put(signFail());
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, 'user', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (e) {
    toast.error('Falha ao cadastrar, tente novamente mais tarde');

    yield put(signFail());
  }
}

/**
 * Utilizado para pegar o que está no cache
 * e trazer como default para o app
 */
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
