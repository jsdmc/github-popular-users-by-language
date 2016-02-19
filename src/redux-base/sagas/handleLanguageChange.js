import { take, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import fetchUsers from './fetchUsers';

export default function* handleLanguageChange(getState) {
  while (true) {
    const language = getState().selectedLanguage;

    yield take(actions.SELECT_LANGUAGE);

    const state = getState();
    const newLanguage = state.selectedLanguage;

    if (language !== newLanguage && !state.usersByLanguage[newLanguage]) {
      yield fork(fetchUsers, newLanguage);
    }
  }
}
