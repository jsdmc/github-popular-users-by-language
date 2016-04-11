import React from 'react';

import expect from 'expect';
import { shallow } from 'enzyme';
import { UsersList, UserItem } from 'components';

describe('UsersList container', () => {
  it('renders empty list when users prop is empty list', () => {
    const usersList = shallow(
      <UsersList users={[]} />
    );

    expect(usersList.find('ol').length).toBe(1);
    expect(usersList.contains(UserItem)).toBe(false);
  });

  it('renders list of users when fetched users', () => {
    const usersList = shallow(
      <UsersList
          users={[{ login: 'user1' }, { login: 'user2' }, { login: 'user3' }]}
      />
    );

    expect(usersList.find(UserItem).length).toEqual(3);
  });
});
