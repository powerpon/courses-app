export const formatCreationDate = (date: string): string => {
	const dateComponents = date.split('/');
	return dateComponents[1] + '.' + dateComponents[0] + '.' + dateComponents[2];
};
