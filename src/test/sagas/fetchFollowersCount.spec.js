import expect from 'expect';

import { put, call } from 'redux-saga/effects';
import api from 'utils/apiService';
import * as actions from '../../redux-base/actions';
import fetchFollowersCount from '../../redux-base/sagas/fetchFollowersCount';

describe('fetchFollowersCount saga', () => {
  const login = 'userName';
  const language = 'javascript';

  describe('base scenario', () => {
   const generator = fetchFollowersCount(login, language);

    it('dispatches REQUEST_FOLLOWERS_COUNT action', () => {
      const result = generator.next();
      expect(result.value).toEqual(put(actions.requestFollowersCount(login, language)));
    });

    it('calls getUserFollowers api', () => {
      const result = generator.next();
      expect(result.value).toEqual(call(api.getUserFollowers, login));
    });


    it('dispatches RECEIVE_FOLLOWERS_COUNT action with followersCount = 0 if no headers and empty data', () => {
      const apiResponse = {
        data: [],
        headers: { }
      };
      const result = generator.next(apiResponse);
      expect(result.value).toEqual(put(actions.receiveFollowersCount(login, language, 0)));
    });

    it('finishes', () => {
      const result = generator.next();
      expect(result.done).toBe(true);
    });
  });

  describe('parses Link header to get the number of lastPage', () => {
    const generator = fetchFollowersCount(login, language);
    generator.next();
    generator.next();

    it('dispatches RECEIVE_FOLLOWERS_COUNT action with proper followersCount', () => {

      const lastPage = 8;
      const apiResponse = {
        data: [],
        headers: {
          link: `<https://api.github.com/user/39191/followers?per_page=1&page=7>; rel="prev",
                 <https://api.github.com/user/39191/followers?per_page=1&page=${lastPage}>; rel="last"`
        }
      };
      const result = generator.next(apiResponse);
      expect(result.value).toEqual(put(actions.receiveFollowersCount(login, language, lastPage)));
    });
  });

  describe('takes pages count from api call if no Link header in response', () => {
    const generator = fetchFollowersCount(login, language);
    generator.next();
    generator.next();

    // skip check
    it('dispatches RECEIVE_FOLLOWERS_COUNT action with followersCount = 1 taken from results', () => {
      const apiResponse = {
        data: [
          { login: 'someUser' }
        ],
        headers: {
        }
      };
      const result = generator.next(apiResponse);
      expect(result.value).toEqual(put(actions.receiveFollowersCount(login, language, 1)));
    });

  });

});
