import * as React from 'react';
import './AuthorsMetaData.scss';
import { Author } from 'src/components/Courses/components/CourseCard/CourseCard';
import useFetch from 'src/custom-hooks/useFetch';
import { SERVER_FETCH_AUTHORS_BY_IDS_URL } from 'src/constants';

interface Props {
	authorIds: string[];
}

export default function AuthorsMetaData(props: Props) {
	const authors: Author[] = useFetch(
		SERVER_FETCH_AUTHORS_BY_IDS_URL,
		...props.authorIds
	);

	return (
		<>
			<pre className='info-data-title'>Authors: </pre>
			{authors.map((author: Author) => author.name).join(', ')}
		</>
	);
}
