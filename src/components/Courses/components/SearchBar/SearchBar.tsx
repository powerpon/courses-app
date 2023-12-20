import * as React from 'react';
import './SearchBar.scss';
import { Input, Button } from '../../../../common';
import { SEARCH_BUTTON_TEXT } from '../../../../constants';

interface Props {
	className?: string;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar(props: Props) {
	const [searchQuery, setSearchQuery]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');

	const handleQuerySubmit = (event: React.FormEvent) => {
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
