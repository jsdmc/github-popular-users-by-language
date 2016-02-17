import React, { PropTypes, Component } from 'react';
import UserItem from './UserItem';

export default class UsersList extends Component {
  render() {
    return (
      <ul>
        {this.props.users.map((user, i) =>
          <li key={i}>
            <UserItem {...{ user }} />
          </li>
        )}
      </ul>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
