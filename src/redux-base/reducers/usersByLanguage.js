import { REQUEST_USERS, RECEIVE_USERS, RECEIVE_FOLLOWERS_COUNT } from '../actions';

function users(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return { ...state, isFetching: true };
    case RECEIVE_USERS:
      return { ...state,
        isFetching: false,
        items: action.users,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

export default function usersByLanguage(state = { }, action) {
  switch (action.type) {
    case REQUEST_USERS:
    case RECEIVE_USERS:
      return { ...state,
        [action.language]: users(state[action.language], action)
      };
    case RECEIVE_FOLLOWERS_COUNT: {
      const { login, language, count } = action;

      const updatedPart = {
        ...state[language],
        items: state[language].items.map(user => {
          if (user.login === login) {
            return {
              ...user,
              followersCount: count
            };
          }
          return user;
        })
      };

      return {
        ...state,
        [language]: updatedPart
      };
    }
    default:
      return state;
  }
}
