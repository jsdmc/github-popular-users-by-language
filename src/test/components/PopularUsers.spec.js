import React from 'react';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { PopularUsers } from 'containers/PopularUsers/PopularUsers';
import { UsersList } from 'components';

describe('PopularUsers container', () => {
  it('renders a loading status when fetching users', () => {
    const popularUsers = mount(
      <PopularUsers
          isFetching
          users={[]}
      />
    );

    expect(popularUsers.find('.loader').length).toEqual(1);
  });

  it('renders list of users when fetched users', () => {
    const popularUsers = shallow(
      <PopularUsers
          isFetching={false}
          users={[{ login: 'user1' }, { login: 'user2' }]}
      />
    );

    expect(popularUsers.find('.loader').length).toEqual(0);

    expect(popularUsers.find(UsersList).length).toEqual(1);
  });
});
