export const getCourseDuration = (minutes: number): string => {
	const remainingMinutes: number = minutes % 60;
	const hours: number = Math.floor(minutes / 60);
	if (Number.isNaN(remainingMinutes) && Number.isNaN(hours)) {
		return '00:00';
	}
	return (
		hours.toString().padStart(2, '0') +
		':' +
		remainingMinutes.toString().padStart(2, '0')
	);
};
