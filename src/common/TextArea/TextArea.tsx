import * as React from 'react';
import { INPUT_BAR_PLACEHOLDER_TEXT } from '../../constants';
import './TextArea.scss';

interface Props {
	className?: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	id?: string;
	form?: string;
}

export default function TextArea(props: Props) {
	const handleInput = (event) => {
		props.setValue(event.target.value);
	};

	return (
		<textarea
			id={props.id}
			value={props.value}
			onChange={handleInput}
			className={'textarea-bar ' + props.className}
			placeholder={INPUT_BAR_PLACEHOLDER_TEXT}
			form={props.form}
		/>
	);
}
