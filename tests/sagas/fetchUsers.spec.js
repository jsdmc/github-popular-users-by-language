import expect from 'expect';

import fetchUsers from 'redux-base/sagas/fetchUsers';
import { put, call, fork } from 'redux-saga/effects';
import api from 'utils/apiService';
import * as actions from 'redux-base/actions';
import fetchFollowersCount from 'redux-base/sagas/fetchFollowersCount';

describe('fetchUsers saga', () => {
  const language = 'java';

  const generator = fetchUsers(language);

  it('dispatches REQUEST_USERS action', () => {
    const result = generator.next();
    expect(result.value).toEqual(put(actions.requestUsers(language)));
  });

  it('calls getPopularUsers api', () => {
    const result = generator.next();
    expect(result.value).toEqual(call(api.getPopularUsers, language));
  });

  let usersSummary;
  it('dispatches RECEIVE_USERS action with short users info', () => {
    const apiResponse = {
      data: {
        items: [
          { login: 'user1', avatar_url: 'https://url1', someProp: 4, anotherProp: {} },
          { login: 'user2', avatar_url: 'https://url2', someProp1: 555, anotherProp2: {}, skippedProp: [] }
        ]
      }
    };
    const now = Date.now();
    const result = generator.next(apiResponse);
    usersSummary = [
      { login: 'user1', avatar_url: 'https://url1' },
      { login: 'user2', avatar_url: 'https://url2' }
    ];

    expect(result.value).toEqual(put(actions.receiveUsers(language, usersSummary, now)));
  });

  it('forks fetchFollowersCount process for each user from above request', () => {
    for (let i = 0; i < usersSummary.length; i++) {
      const user = usersSummary[i];

      const result = generator.next();
      expect(result.value).toEqual(fork(fetchFollowersCount, user.login, language));
    }
  });

  it('finishes', () => {
    const result = generator.next();
    expect(result.done).toBe(true);
  });
});
