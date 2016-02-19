import { put, call, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import api from 'utils/apiService';
import fetchFollowersCount from './fetchFollowersCount';

export default function* fetchUsers(language) {
  yield put(actions.requestUsers(language));

  const apiResult = yield call(api.getPopularUsers, language);

  const users = apiResult.data.items.map(user => ({
    login: user.login,
    avatar_url: user.avatar_url
  }));
  const now = Date.now();

  yield put(actions.receiveUsers(language, users, now));

  for (const { login } of users) {
    yield fork(fetchFollowersCount, login, language);
  }
}
