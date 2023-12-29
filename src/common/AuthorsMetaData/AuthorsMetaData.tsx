import * as React from 'react';
import './AuthorsMetaData.scss';
import { Author } from 'src/components/Courses/components/CourseCard/CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorsSelector } from 'src/store/authors/selectors';
import { AppDispatch } from 'src/store';
import { fetchAllAuthors } from 'src/store/authors/thunk';

interface Props {
	authorIds: string[];
}

export default function AuthorsMetaData(props: Props) {
	const authors: Author[] = useSelector(getAuthorsSelector).authors.filter(
		(author) => props.authorIds.includes(author.id)
	);
	const dispatch = useDispatch<AppDispatch>();

	React.useEffect(() => {
		dispatch(fetchAllAuthors());
	}, []);

	return (
		<>
			<pre className='info-data-title'>Authors: </pre>
			{authors.map((author: Author) => author.name).join(', ')}
		</>
	);
}
