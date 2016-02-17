import { SELECT_LANGUAGE } from '../actions';

export default function selectedLanguage(state = 'javascript', action) {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return action.language;
    default:
      return state;
  }
}
