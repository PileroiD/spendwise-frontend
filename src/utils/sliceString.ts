export const sliceString = (str: string, length: number): string => {
	if (str?.length > length) {
		return str.slice(0, length) + "...";
	}
	return str;
};
