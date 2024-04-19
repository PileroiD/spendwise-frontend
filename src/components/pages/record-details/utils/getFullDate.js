const properDigit = (dateItem) => {
    if (parseInt(dateItem) < 10) {
        return "0" + dateItem;
    }
    return dateItem;
};

export const getFullDate = (dateFromServer) => {
    const date = new Date(dateFromServer);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}-${properDigit(month)}-${properDigit(day)} ${properDigit(
        hours
    )}:${properDigit(minutes)}`;
};
