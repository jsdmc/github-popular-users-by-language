import expect from 'expect';
import usersByLanguage from '../../redux-base/reducers/usersByLanguage';
import * as actions from '../../redux-base/actions';

describe('usersByLanguage reducer', () => {
  it('should handle initial state', () => {
    expect(usersByLanguage(undefined, {})).toEqual({});
  });

  it('should handle REQUEST_USERS action', () => {

    const state = {
      java: {
        isFetching: false
      },
      python: {

      }
    };

    expect(
      usersByLanguage(state, {
        type: 'REQUEST_USERS',
        language: 'java'
      })
    ).toEqual({
      java: {
        isFetching: true
      },
      python: {

      }
    });

  });


  it('should handle RECEIVE_USERS action', () => {

    const state = {
      java: {
        isFetching: true
      },
      python: {
        items: [
          { login: 'user1' },
          { login: 'user2' }
        ]
      }
    };

    let users = [
      { login: 'user1-java' },
      { login: 'user2-java' }
    ];
    let action = actions.receiveUsers('java', users);

    expect(
      usersByLanguage(state, action)
    )
    .toEqual({
      ...state,
      java: {
        isFetching: false,
        items: users,
        lastUpdated: action.receivedAt
      }
    });

    users = [
      { login: 'user1-python' },
      { login: 'user2-python' }
    ];
    action = actions.receiveUsers('python', users);

    expect(
      usersByLanguage(state, action)
    )
    .toEqual({
      ...state,
      python: {
        isFetching: false,
        items: users,
        lastUpdated: action.receivedAt
      }
    });

  });

  it('should handle RECEIVE_FOLLOWERS_COUNT action', () => {

    const initState = {
      java: {
        items: [
          { login: 'user1-java' },
          { login: 'user2-java' }
        ]
      },
      python: {
        items: [
          { login: 'user1-python' },
          { login: 'user2-python' }
        ]
      }
    };

    let action = actions.receiveFollowersCount('user2-java', 'java', 12345);
    let state = usersByLanguage(initState, action);

    expect(
      state
    )
    .toEqual({
      ...initState,
      java: {
        items: [
          {
            login: 'user1-java'
          },
          {
            login: 'user2-java',
            followersCount: 12345
          }
        ]
      }
    });

    action = actions.receiveFollowersCount('user3-java', 'java', 777);
    state = usersByLanguage(state, action);

    expect(state).toEqual(state);

    action = actions.receiveFollowersCount('user1-python', 'python', 333);
    state = usersByLanguage(initState, action);

    expect(
      state
    )
    .toEqual({
      ...initState,
      python: {
        items: [
          {
            login: 'user1-python',
            followersCount: 333
          },
          {
            login: 'user2-python'
          }
        ]
      }
    });

  });
});
