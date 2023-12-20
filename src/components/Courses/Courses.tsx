import * as React from 'react';
import './Courses.scss';
import { CourseCard, EmptyCourseList, SearchBar } from '../../components';
import { Course, Author } from './components/CourseCard/CourseCard';

interface Props {
	courses?: Course[];
	authors?: Author[];
	setCourseInfoId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Courses(props: Props) {
	const [query, setQuery]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');

	return (
		<main className='courses'>
			<>
				<SearchBar
					query={query}
					setQuery={setQuery}
					className='loaded-search-bar'
				/>
				{query === ''
					? props.courses.map((course) => (
							<CourseCard
								setCourseInfoId={props.setCourseInfoId}
								className='loaded-course-card'
								key={course.id}
								course={course}
								authors={props.authors}
							/>
						))
					: props.courses
							.filter((course) => {
								return (
									course.title.toLowerCase().includes(query) ||
									course.id.toLowerCase().includes(query)
								);
							})
							.map((course) => (
								<CourseCard
									setCourseInfoId={props.setCourseInfoId}
									className='loaded-course-card'
									key={course.id}
									course={course}
									authors={props.authors}
								/>
							))}
			</>
		</main>
	);
}
