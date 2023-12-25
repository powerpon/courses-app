import * as React from 'react';
import './CourseInfo.scss';
import { Button } from '../../common';
import {
	BACK_BUTTON_TEXT,
	SERVER_FETCH_COURSES_BY_IDS_URL,
} from '../../constants';
import { Course } from '../Courses/components/CourseCard/CourseCard';
import { formatCreationDate, getCourseDuration } from '../../helpers';
import { Link, useParams } from 'react-router-dom';
import useFetch from 'src/custom-hooks/useFetch';
import AuthorsMetaData from 'src/common/AuthorsMetaData/AuthorsMetaData';

export default function CourseInfo() {
	const { courseId } = useParams();
	const [course]: Course[] = useFetch(
		SERVER_FETCH_COURSES_BY_IDS_URL,
		courseId
	);

	if (course === undefined) {
		return <></>;
	}
	return (
		<main className='course-info'>
			<h3 className='course-info-title'>{course.title}</h3>
			<article className='course-info-box'>
				<div className='course-info-description'>
					<p className='info-description-title'>Description:</p>
					<p className='info-description'>{course.description}</p>
				</div>
				<div className='course-info-middle-line'></div>
				<ul className='course-info-meta-data'>
					<li className='info-data'>
						<pre className='info-data-title'>ID: </pre>
						{course.id}
					</li>
					<li className='info-data'>
						<pre className='info-data-title'>Duration: </pre>
						{getCourseDuration(course.duration) + ' hours'}
					</li>
					<li className='info-data'>
						<pre className='info-data-title'>Created: </pre>
						{formatCreationDate(course.creationDate)}
					</li>
					<li className='info-data'>
						<AuthorsMetaData authorIds={course.authors} />
					</li>
				</ul>
			</article>
			<Link className='course-info-back-btn' to={'/courses'}>
				<Button buttonText={BACK_BUTTON_TEXT} />
			</Link>
		</main>
	);
}
