import * as React from 'react';
import './Courses.scss';
import { CourseCard, EmptyCourseList, SearchBar } from '../../components';
import { Course } from './components/CourseCard/CourseCard';
import useFetch from 'src/custom-hooks/useFetch';
import {
	ADD_NEW_COURSE_BUTTON_TEXT,
	SERVER_FETCH_ALL_COURSES_URL,
} from 'src/constants';
import { Button } from 'src/common';
import { Link } from 'react-router-dom';

export default function Courses() {
	const courses: Course[] = useFetch(SERVER_FETCH_ALL_COURSES_URL);

	const [query, setQuery]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [isUserLoggedIn, setIsUserLoggedIn]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);

	React.useEffect(() => {
		if (localStorage.getItem('accessToken') !== null) {
			setIsUserLoggedIn(true);
			return;
		}
		setIsUserLoggedIn(false);
	}, []);

	if (courses.length === 0) {
		return <EmptyCourseList />;
	}
	return (
		<main className='courses'>
			<div className='search-bar-create-course-btn'>
				<SearchBar
					query={query}
					setQuery={setQuery}
					className='loaded-search-bar'
				/>
				<Link
					style={{ display: isUserLoggedIn ? 'block' : 'none' }}
					to={'/courses/add'}
				>
					<Button buttonText={ADD_NEW_COURSE_BUTTON_TEXT} />
				</Link>
			</div>
			{query === ''
				? courses.map((course) => (
						<CourseCard
							className='loaded-course-card'
							key={course.id}
							course={course}
							authorIds={course.authors}
						/>
					))
				: courses
						.filter((course) => {
							return (
								course.title.toLowerCase().includes(query) ||
								course.id.toLowerCase().includes(query)
							);
						})
						.map((course) => (
							<CourseCard
								className='loaded-course-card'
								key={course.id}
								course={course}
								authorIds={course.authors}
							/>
						))}
		</main>
	);
}
