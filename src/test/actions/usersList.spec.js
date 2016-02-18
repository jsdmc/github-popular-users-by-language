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
    const action = actions.receiveUsers('python', users);

    const { receivedAt, ...actionWithoutTime } = action;

    expect(actionWithoutTime).toEqual({
      type: 'RECEIVE_USERS',
      language: 'python',
      users
    });

    expect(new Date(action.receivedAt).getMonth()).toEqual(now.getMonth());
    expect(new Date(action.receivedAt).getDay()).toEqual(now.getDay());
    expect(new Date(action.receivedAt).getHours()).toEqual(now.getHours());
    expect(new Date(action.receivedAt).getMinutes()).toEqual(now.getMinutes());

  });
});
