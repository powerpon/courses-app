import * as React from 'react';
import './Courses.scss';
import { CourseCard, EmptyCourseList, SearchBar } from '../../components';
import { ADD_NEW_COURSE_BUTTON_TEXT } from 'src/constants';
import { Button } from 'src/common';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/store/user/selectors';
import endpoints from '../../services';
import { CoursesState, fetchAllCourses } from 'src/store/courses/slice';
import { UserState } from 'src/store/user/slice';
import { getCoursesSelector } from 'src/store/courses/selectors';

export default function Courses() {
	const coursesState: CoursesState = useSelector(getCoursesSelector);
	const user: UserState = useSelector(getUserSelector);
	const dispatch = useDispatch();

	const [query, setQuery]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');

	React.useEffect(() => {
		endpoints
			.getAllCourses()
			.then((response) => dispatch(fetchAllCourses(response.data.result)))
			.catch((error) => console.log(error));
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
