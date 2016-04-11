import expect from 'expect';
import selectedLanguage from 'redux-base/reducers/selectedLanguage';
import * as actions from 'redux-base/actions';

describe('selectedLanguage reducer', () => {
  it('should return "javascript" language as initial state', () => {
    expect(
      selectedLanguage(undefined, {})
    ).toEqual('javascript');
  });

  it('should handle SELECT_LANGUAGE action', () => {
    const action = actions.selectLanguage('python');
    expect(
      selectedLanguage(undefined, action)
    ).toEqual('python');
  });
});
