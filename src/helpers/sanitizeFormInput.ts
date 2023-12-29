import { Dispatch, SetStateAction } from 'react';

export const sanitizeFormInput = (
	input: string,
	setInput: Dispatch<SetStateAction<string>>,
	setIsInputInvalid: Dispatch<SetStateAction<boolean>>,
	mininumCharacters = 1
) => {
	const clearInput = input.trim();
	setInput(clearInput);
	if (clearInput.length < mininumCharacters) {
		setIsInputInvalid(true);
		return true;
	}
	setIsInputInvalid(false);
	return false;
};
