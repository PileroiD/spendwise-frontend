export const correctAmount = (type, amount) => {
    return type === "Incomes" ? Math.abs(amount) : -amount;
};
