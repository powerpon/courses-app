import * as React from 'react';
import './Courses.scss';
import { CourseCard, EmptyCourseList, SearchBar } from '../../components';
import { ADD_NEW_COURSE_BUTTON_TEXT } from 'src/constants';
import { Button } from 'src/common';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/store/user/selectors';
import { CoursesState } from 'src/store/courses/slice';
import { UserState } from 'src/store/user/slice';
import { getCoursesSelector } from 'src/store/courses/selectors';
import { AppDispatch } from 'src/store';
import { login } from 'src/store/user/thunk';
import { fetchAllCourses } from 'src/store/courses/thunk';

export default function Courses() {
	const coursesState: CoursesState = useSelector(getCoursesSelector);
	const user: UserState = useSelector(getUserSelector);
	const dispatch = useDispatch<AppDispatch>();

	const [query, setQuery]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');

	React.useEffect(() => {
		if (localStorage.getItem('accessToken') !== null) {
			dispatch(login(localStorage.getItem('accessToken')));
		}
		dispatch(fetchAllCourses());
	}, []);

	if (coursesState.courses.length === 0) {
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
					style={{ display: user.isAuth ? 'block' : 'none' }}
					to={'/courses/add'}
				>
					<Button buttonText={ADD_NEW_COURSE_BUTTON_TEXT} />
				</Link>
			</div>
			{query === ''
				? coursesState.courses.map((course) => (
						<CourseCard
							className='loaded-course-card'
							key={course.id}
							course={course}
							authorIds={course.authors}
						/>
					))
				: coursesState.courses
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
