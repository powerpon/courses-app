import * as React from 'react';
import { SHOW_COURSE_BUTTON_TEXT } from '../../../../constants';
import './CourseCard.scss';
import { formatCreationDate, getCourseDuration } from '../../../../helpers';
import { Button } from '../../../../common';
import { Link } from 'react-router-dom';
import AuthorsMetaData from 'src/common/AuthorsMetaData/AuthorsMetaData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserState } from 'src/store/user/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/store/user/selectors';
import endpoints from '../../../../services';
import { deleteCourse } from 'src/store/courses/slice';

interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

interface Author {
	id: string;
	name: string;
}

interface Props {
	course: Course;
	authorIds: string[];
	className?: string;
}

export default function CourseCard(props: Props) {
	const user: UserState = useSelector(getUserSelector);
	const dispatch = useDispatch();

	const handleCourseDelettion = (courseId: string) => {
		endpoints
			.deleteCourseById(courseId, user.token)
			.then(() => {
				dispatch(deleteCourse(courseId));
			})
			.catch((error) => console.log(error));
	};

	return (
		<article className={'card ' + props.className}>
			<p className='card-title'>{props.course.title}</p>
			<div className='card-main-section'>
				<blockquote className='card-description'>
					{props.course.description}
				</blockquote>
				<div className='card-meta-data-btn'>
					<ul className='card-meta-data'>
						<li className='meta-data-info'>
							<AuthorsMetaData authorIds={props.course.authors} />
						</li>
						<li className='meta-data-info'>
							<pre className='meta-data-title'>Duration: </pre>
							{getCourseDuration(props.course.duration) + ' hours'}
						</li>
						<li className='meta-data-info'>
							<pre className='meta-data-title'>Created: </pre>
							{formatCreationDate(props.course.creationDate)}
						</li>
					</ul>
					<div className='course-card-btns'>
						<Link to={`/courses/${props.course.id}`}>
							<Button buttonText={SHOW_COURSE_BUTTON_TEXT} />
						</Link>
						<Button
							onClick={() => {
								handleCourseDelettion(props.course.id);
							}}
							className='delete-course-btn'
						>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
						<Button className='delete-course-btn'>
							<FontAwesomeIcon icon={faPen} />
						</Button>
					</div>
				</div>
			</div>
		</article>
	);
}

export type { Course, Author };
