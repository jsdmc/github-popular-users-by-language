import expect from 'expect';
import selectedLanguage from '../../src/redux-base/reducers/selectedLanguage';

describe('selectedLanguage reducer', () => {
  it('should return "javascript" language as initial state', () => {
    expect(
      selectedLanguage(undefined, {})
    ).toEqual('javascript');
  });
});
