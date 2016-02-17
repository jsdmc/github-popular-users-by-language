
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_FOLLOWERS_COUNT = 'REQUEST_FOLLOWERS_COUNT';
export const RECEIVE_FOLLOWERS_COUNT = 'RECEIVE_FOLLOWERS_COUNT';

export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
export const REFRESH_RESULTS = 'REFRESH_RESULTS';

export function selectLanguage(language) {
  return {
    type: SELECT_LANGUAGE,
    language
  };
}

export function refreshResults(language) {
  return {
    type: REFRESH_RESULTS,
    language
  };
}

export function requestUsers(language) {
  return {
    type: REQUEST_USERS,
    language
  };
}

export function receiveUsers(language, users) {
  return {
    type: RECEIVE_USERS,
    language,
    users,
    receivedAt: Date.now()
  };
}

export function requestFollowersCount(login) {
  return {
    type: REQUEST_FOLLOWERS_COUNT,
    login
  };
}

export function receiveFollowersCount(login, language, count) {
  return {
    type: RECEIVE_FOLLOWERS_COUNT,
    login,
    language,
    count
  };
}
