import React from 'react';

export const sanitizeFormInput = (
	input: string,
	setInput: React.Dispatch<React.SetStateAction<string>>,
	setIsInputInvalid: React.Dispatch<React.SetStateAction<boolean>>,
	mininumCharacters = 1
) => {
	const clearInput = input.trim();
	setInput(clearInput);
	if (clearInput.length < mininumCharacters) {
		setIsInputInvalid(true);
		return;
	}
	setIsInputInvalid(false);
};
