import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(url: string, ...ids: any[]) {
	const [content, setContent]: [
		any[],
		React.Dispatch<React.SetStateAction<any[]>>,
	] = useState([]);

	const getContent = async () => {
		if (ids.length === 0) {
			const response = await axios.get(url);
			setContent(response.data.result);
			return;
		}
		const authorsPromises: Promise<any>[] = ids.map(async (id) => {
			const response = await axios.get(url + id);
			return response.data.result;
		});
		setContent(await Promise.all(authorsPromises));
	};

	useEffect(() => {
		getContent();
	}, []);

	return content;
}
