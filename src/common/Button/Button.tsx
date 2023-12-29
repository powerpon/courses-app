import './Button.scss';
import React, { MouseEventHandler } from 'react';

interface Props {
	buttonText?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	form?: string;
	children?: JSX.Element;
}

export default function Button(props: Props) {
	return (
		<button
			form={props.form}
			className={'btn ' + props.className}
			onClick={props.onClick}
		>
			{props.buttonText || props.children}
		</button>
	);
}
