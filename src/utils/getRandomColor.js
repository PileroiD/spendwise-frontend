export const getRandomColor = () => {
    const numbers = [];
    for (let i = 0; i < 3; i++) {
        numbers.push(Math.floor(Math.random() * 256));
    }

    return `rgba(${numbers.join(", ")})`;
};
