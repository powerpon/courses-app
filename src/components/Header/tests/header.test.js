/* eslint-disable no-undef */
import { cleanup, render, screen } from '@testing-library/react';
import Header from '../Header';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getUserSelector } from '../../../store/user/selectors';

afterEach(cleanup);

jest.mock('../../../store/user/selectors');

const mockedState = {
	user: {
		isAuth: true,
		name: 'User Name',
		email: '',
		token: '',
		role: '',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Header', () => {
	it('should contain Logo element', () => {
		getUserSelector.mockReturnValue(mockedState.user);

		render(
			<Provider store={mockedStore}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);
		expect(screen.getByAltText('logo')).toBeInTheDocument;
	});

	it('should contain user name', () => {
		getUserSelector.mockReturnValue(mockedState.user);

		render(
			<Provider store={mockedStore}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);
		expect(screen.getByText('User Name')).toBeInTheDocument;
	});
});
