export const getCourseDuration = (minutes: number): string => {
	const remainingMinutes: number = minutes % 60;
	const hours: number = Math.floor(minutes / 60);
	return (
		hours.toString().padStart(2, '0') +
		':' +
		remainingMinutes.toString().padStart(2, '0')
	);
};
