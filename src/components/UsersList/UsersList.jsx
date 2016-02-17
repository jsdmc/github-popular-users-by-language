import React, { PropTypes, Component } from 'react';
import UserItem from './UserItem';
import styles from './UsersList.scss';

export default class UsersList extends Component {
  render() {
    return (
      <ol className={`${styles['follow-list']} clearfix`}>
        {this.props.users.map((user, i) =>
          <UserItem {...{ user }} key={i}/>
        )}
      </ol>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};
