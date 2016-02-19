import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import api from 'utils/apiService';
import parseLinkHeader from 'parse-link-header';

export default function* fetchFollowersCount(login, language) {
  yield put(actions.requestFollowersCount(login, language));

  const apiResult = yield call(api.getUserFollowers, login);

  let followersCount;

  const pageLink = parseLinkHeader(apiResult.headers.link);
  if (pageLink && pageLink.last) {
    followersCount = +pageLink.last.page;
  } else {
    followersCount = apiResult.data.length;
  }

  yield put(actions.receiveFollowersCount(login, language, followersCount));
}
