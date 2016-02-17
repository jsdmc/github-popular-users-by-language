import { take, call } from 'redux-saga/effects';
import * as actions from '../actions';
import fetchUsers from './fetchUsers';

export default function *refreshResults() {
  while (true) {
    const { language } = yield take(actions.REFRESH_RESULTS);
    yield call(fetchUsers, language);
  }
}
