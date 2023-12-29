import { INPUT_BAR_PLACEHOLDER_TEXT } from 'src/constants';
import './Input.scss';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
	className?: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	id?: string;
	type?: 'password' | 'text' | 'number';
	form?: string;
	min?: number;
}

export default function Input(props: Props) {
	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		props.setValue(event.target.value);
	};

	return (
		<input
			id={props.id}
			value={props.value}
			onChange={handleInput}
			className={'input-bar ' + props.className}
			placeholder={INPUT_BAR_PLACEHOLDER_TEXT}
			type={props.type ? props.type : 'text'}
			form={props.form}
			min={props.min}
		/>
	);
}
