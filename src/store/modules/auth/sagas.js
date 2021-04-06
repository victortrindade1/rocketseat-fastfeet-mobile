import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `mobile/deliverymen/${id}`);

    const { data } = response;

    yield put(signInSuccess(data));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login. Verifique seus dados',
    );
    yield put(signFailure());
  }
}

// export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  // takeLatest('@auth/SIGN_OUT', signOut),
]);
