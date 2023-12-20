import * as React from 'react';
import './CourseInfo.scss';
import { Button } from '../../common';
import { BACK_BUTTON_TEXT } from '../../constants';
import { Course, Author } from '../Courses/components/CourseCard/CourseCard';
import { formatCreationDate, getCourseDuration } from '../../helpers';

interface Props {
	courseInfoId: string;
	setCourseInfoId: React.Dispatch<React.SetStateAction<string>>;
	courses: Course[];
	authors: Author[];
}

export default function CourseInfo(props: Props) {
	const handleBackButton = () => {
		props.setCourseInfoId('');
	};

	return (
		<main className='course-info'>
			{props.courses
				.filter((course) => props.courseInfoId === course.id)
				.map((course) => (
					<>
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
									<pre className='info-data-title'>Authors: </pre>
									{props.authors
										.filter((author: Author) =>
											course.authors.includes(author.id)
										)
										.map((author: Author) => author.name)
										.join(', ')}
								</li>
							</ul>
						</article>
						<Button
							className='course-info-back-btn'
							onClick={handleBackButton}
							buttonText={BACK_BUTTON_TEXT}
						/>
					</>
				))}
		</main>
	);
}
