import React, { PropTypes } from 'react';
import UserItem from './UserItem';
import styles from './UsersList.scss';

const UsersList = ({ users }) => (
  <ol className={`${styles['follow-list']} clearfix`}>
    {users.map((user, i) =>
      <UserItem {...{ user }} key={i}/>
    )}
  </ol>
);

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;
