import { fork } from 'redux-saga/effects';
import fetchUsers from './fetchUsers';
import handleLanguageChange from './handleLanguageChange';
import refreshResults from './refreshResults';

function* startup(getState) {
  yield fork(fetchUsers, getState().selectedLanguage);
}

export default function* root(getState) {
  yield fork(startup, getState);
  yield fork(handleLanguageChange, getState);
  yield fork(refreshResults, getState);
}
