import { Input, Button } from 'src/common';
import { SEARCH_BUTTON_TEXT } from 'src/constants';
import './SearchBar.scss';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';

interface Props {
	className?: string;
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchBar(props: Props) {
	const [searchQuery, setSearchQuery] = useState('');

	const handleQuerySubmit = (event: FormEvent) => {
		event.preventDefault();
		const clearQuery = searchQuery.trim().toLowerCase();
		props.setQuery(clearQuery);
	};

	return (
		<form
			onSubmit={handleQuerySubmit}
			className={'search-form ' + props.className}
			method='GET'
		>
			<Input
				value={searchQuery}
				setValue={setSearchQuery}
				className='search-input'
			/>
			<Button buttonText={SEARCH_BUTTON_TEXT} />
		</form>
	);
}
