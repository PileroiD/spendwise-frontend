export const sliceString = (str, length) => {
    if (str?.length > length) {
        return str.slice(0, length) + "...";
    }
    return str;
};
