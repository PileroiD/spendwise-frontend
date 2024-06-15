import { getRandomColor } from "../../../utils/getRandomColor";

export const createRandomColorsArray = (times: number | undefined): Array<string> => {
	const arrayOfColors = [];
	for (let i = 0; i < (times as number); i++) {
		arrayOfColors.push(getRandomColor());
	}

	return arrayOfColors;
};
