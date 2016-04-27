import React, { PropTypes } from 'react';

const UserItem = (props) => {

  const {
    user: {
      login,
      avatar_url,
      followersCount
    }
  } = props;

  return (
    <li className="follow-list-item">
      <a href={`https://github.com/${login}`}>
        <img className="gravatar" src={`${avatar_url}&s=192`} width="96" height="96" />
      </a>
      <div className="follow-list-container">
        <h3 className="follow-list-name">
          <span className="css-truncate css-truncate-target" title={login}>
            <a href={`https://github.com/${login}`}>{login}</a>
          </span>
        </h3>
        <span className="user-followers-container">
          <span className="followers">
            Followers: <span className="followers-count">{followersCount}</span>
          </span>
        </span>
      </div>
    </li>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
