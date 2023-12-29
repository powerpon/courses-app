import React from 'react';
import './AuthorItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
	name: string;
	handleAdd?: () => void;
	handleRemove?: () => void;
}

export default function AuthorItem(props: Props) {
	return (
		<div className='author-item'>
			<p>{props.name}</p>
			{props.handleAdd && (
				<FontAwesomeIcon
					className='author-handle-icon'
					onClick={props.handleAdd}
					icon={faPlus}
				/>
			)}
			{props.handleRemove && (
				<FontAwesomeIcon
					className='author-handle-icon'
					onClick={props.handleRemove}
					icon={faTrash}
				/>
			)}
		</div>
	);
}
