import { getRandomColor } from "../../../utils/getRandomColor";

export const createRandomColorsArray = (times) => {
    const arrayOfColors = [];
    for (let i = 0; i < times; i++) {
        arrayOfColors.push(getRandomColor());
    }

    return arrayOfColors;
};
