import expect from 'expect';
import * as actions from '../../redux-base/actions';

describe('app actions', () => {
  it('selectLanguage should create SELECT_LANGUAGE action', () => {
    expect(actions.selectLanguage('javascript')).toEqual({
      type: 'SELECT_LANGUAGE',
      language: 'javascript'
    });
  });

  it('receiveUsers should create RECEIVE_USERS action', () => {
    const users = [{ login: 'user1' }, { login: 'user2' }];
    const now = new Date();
    const action = actions.receiveUsers('python', users, now);

    expect(action).toEqual({
      type: 'RECEIVE_USERS',
      language: 'python',
      users,
      receivedAt: now
    });

  });
});
