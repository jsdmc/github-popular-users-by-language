import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectLanguage, refreshResults } from 'redux-base/actions';
import { LanguagePicker, UsersList } from 'components';

class PopularUsers extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleChange(nextLanguage) {
    this.props.dispatch(selectLanguage(nextLanguage));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, selectedLanguage } = this.props;
    dispatch(refreshResults(selectedLanguage));
  }

  render() {
    const { selectedLanguage, users, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <LanguagePicker
            value={selectedLanguage}
            onChange={this.handleChange}
            options={['javascript', 'html', 'c#', 'java']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}
            >
              Refresh
            </a>
          }
        </p>
        {isFetching && users.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && users.length === 0 &&
          <h2>Empty.</h2>
        }
        {users.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <UsersList users={users} />
          </div>
        }
      </div>
    );
  }
}

PopularUsers.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedLanguage, usersByLanguage } = state;
  const { isFetching, lastUpdated, items: users } = usersByLanguage[selectedLanguage] || { isFetching: true, items: [] };

  return {
    selectedLanguage,
    users,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(PopularUsers);
