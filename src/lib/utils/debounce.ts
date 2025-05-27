/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function debounce<T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
) {
	let timerId: NodeJS.Timeout | null = null;
	return (...args: Parameters<T>) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), delay);
	};
}
