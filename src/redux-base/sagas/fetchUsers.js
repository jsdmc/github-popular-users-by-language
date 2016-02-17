import { put, call, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import api from 'utils/apiService';
import fetchFollowersCount from './fetchFollowersCount';

export default function *fetchUsers(language) {
  yield put(actions.requestUsers(language));

  const apiResult = yield call(api.getPopularUsers, language);

  const users = apiResult.data.items.map(user => ({
    login: user.login,
    avatar_url: user.avatar_url
  }));

  yield put(actions.receiveUsers(language, users));

  for (let i = 0, len = users.length; i < len; i++) {
    const userName = users[i].login;

    yield fork(fetchFollowersCount, userName, language);
  }
}
