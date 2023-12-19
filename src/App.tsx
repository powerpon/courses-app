import './App.scss';
import React, { useEffect, useState } from 'react';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import {
	Header,
	EmptyCourseList,
	SearchBar,
	Courses,
	CourseInfo,
} from './components';
import { Input } from './common';

export default function App() {
	const [courseInfoId, setCourseInfoId]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = useState('');

	return (
		<>
			<Header />
			{mockedCoursesList.length !== 0 ? (
				courseInfoId !== '' ? (
					<CourseInfo
						courses={mockedCoursesList}
						authors={mockedAuthorsList}
						courseInfoId={courseInfoId}
						setCourseInfoId={setCourseInfoId}
					/>
				) : (
					<Courses
						setCourseInfoId={setCourseInfoId}
						courses={mockedCoursesList}
						authors={mockedAuthorsList}
					/>
				)
			) : (
				<EmptyCourseList />
			)}
		</>
	);
}
