import React from 'react';
import { Route, Redirect } from 'react-router';
import { CoreLayout, PopularUsers } from './containers';

export default () => (
		<Route component={CoreLayout}>
			<Route path="languages" component={PopularUsers} />
			<Redirect from="/" to="/languages" />
		</Route>
);
