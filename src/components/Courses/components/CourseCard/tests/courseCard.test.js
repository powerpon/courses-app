/* eslint-disable no-undef */
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getUserSelector } from '../../../../../store/user/selectors';
import { getAuthorsSelector } from '../../../../../store/authors/selectors';
import CourseCard from '../CourseCard';
import { getCourseDuration, formatCreationDate } from '../../../../../helpers';

afterEach(cleanup);

jest.mock('../../../../../store/user/selectors');
jest.mock('../../../../../store/authors/selectors');

const mockedState = {
	user: {
		isAuth: true,
		name: '',
		email: '',
		token: '',
		role: '',
	},
	courses: [],
	authors: [
		{ id: 'author1', name: 'author name 1' },
		{ id: 'author2', name: 'author name 2' },
		{ id: 'author3', name: 'author name 3' },
	],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockCourse = {
	id: '1',
	title: 'Course Title',
	description: 'Course description',
	creationDate: '1/2/2001',
	duration: 90,
	authors: ['author1', 'author2', 'author3'],
};

describe('CourseCard', () => {
	it('should contain title', () => {
		getUserSelector.mockReturnValue(mockedState.user);
		getAuthorsSelector.mockReturnValue({
			authors: mockedState.authors,
		});

		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard course={mockCourse} authorIds={mockCourse.authors} />
				</Router>
			</Provider>
		);
		expect(screen.getByText('Course Title')).toBeInTheDocument;
	});

	it('should contain description', () => {
		getUserSelector.mockReturnValue(mockedState.user);
		getAuthorsSelector.mockReturnValue({
			authors: mockedState.authors,
		});

		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard course={mockCourse} authorIds={mockCourse.authors} />
				</Router>
			</Provider>
		);
		expect(screen.getByText('Course description')).toBeInTheDocument;
	});

	it('should contain duration in correct format', () => {
		getUserSelector.mockReturnValue(mockedState.user);
		getAuthorsSelector.mockReturnValue({
			authors: mockedState.authors,
		});

		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard course={mockCourse} authorIds={mockCourse.authors} />
				</Router>
			</Provider>
		);
		expect(getCourseDuration(90)).toBe('01:30');
		expect(screen.getByText(getCourseDuration(90) + ' hours'))
			.toBeInTheDocument;
	});

	it('should contain authors list', () => {
		getUserSelector.mockReturnValue(mockedState.user);
		getAuthorsSelector.mockReturnValue({
			authors: mockedState.authors,
		});

		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard course={mockCourse} authorIds={mockCourse.authors} />
				</Router>
			</Provider>
		);
		expect(
			screen.getByText(
				mockedState.authors.map((author) => author.name).join(', ')
			)
		).toBeInTheDocument;
	});

	it('should contain creation date in correct format', () => {
		getUserSelector.mockReturnValue(mockedState.user);
		getAuthorsSelector.mockReturnValue({
			authors: mockedState.authors,
		});

		render(
			<Provider store={mockedStore}>
				<Router>
					<CourseCard course={mockCourse} authorIds={mockCourse.authors} />
				</Router>
			</Provider>
		);
		expect(formatCreationDate(mockCourse.creationDate)).toBe('2.1.2001');
		expect(screen.getByText(formatCreationDate(mockCourse.creationDate)))
			.toBeInTheDocument;
	});
});
