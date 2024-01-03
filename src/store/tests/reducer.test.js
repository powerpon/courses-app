/* eslint-disable no-undef */
import { cleanup } from '@testing-library/react';
import coursesReducer from '../courses/slice';
import { saveCourse } from '../courses/thunk';
import axios from 'axios';
import { store } from '../../store';

afterEach(cleanup);

jest.mock('axios');

const mockCourse = {
	id: '1',
	title: 'Course Title',
	description: 'Course description',
	creationDate: '1/2/2001',
	duration: 90,
	authors: ['author1', 'author2', 'author3'],
};

const mockDataForAxios = {
	courseTitle: mockCourse.title,
	courseDescription: mockCourse.description,
	courseDuration: mockCourse.duration,
	courseAuthorIds: mockCourse.authors,
	token: 'mockToken',
};

const mockedInitialState = {
	courses: [],
};

const mockedStateAfterSaveCourse = {
	courses: [mockCourse],
};

describe('coursesReducer', () => {
	it('should return the initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual(
			mockedInitialState
		);
	});

	it('should handle SAVE_COURSE and returns new state', async () => {
		axios.post.mockImplementation(() =>
			Promise.resolve({ data: { result: mockCourse } })
		);
		await store.dispatch(saveCourse(mockDataForAxios));
		expect(store.getState().default.coursesReducer).toEqual(
			mockedStateAfterSaveCourse
		);
	});
});
