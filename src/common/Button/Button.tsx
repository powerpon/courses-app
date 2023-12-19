import * as React from 'react';
import './Button.scss';

interface Props {
	buttonText?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

export default function Button(props: Props) {
	return (
		<button className={'btn ' + props.className} onClick={props.onClick}>
			{props.buttonText}
		</button>
	);
}
