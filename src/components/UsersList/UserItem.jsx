import React, { PropTypes, Component } from 'react';

export default class UserItem extends Component {
  render() {
    const {
      user: {
        login,
        avatar_url,
        followersCount
      }
    } = this.props;

    return (
      <div>
        <img src={avatar_url} width="72" height="72" />
        {login}
        <br/>
        Followers count: <span>{followersCount}</span>
      </div>
    );
  }
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};
