import * as React from 'react';
import { INPUT_BAR_PLACEHOLDER_TEXT } from '../../constants';
import './Input.scss';

interface Props {
	className?: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input(props: Props) {
	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.setValue(event.target.value);
	};

	return (
		<input
			value={props.value}
			onChange={handleInput}
			className={'input-bar ' + props.className}
			placeholder={INPUT_BAR_PLACEHOLDER_TEXT}
			type='text'
		/>
	);
}
