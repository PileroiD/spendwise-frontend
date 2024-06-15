export const correctAmount = (type: string | undefined, amount: string | number): number => {
	return type === "Incomes" ? Math.abs(+amount) : -amount;
};
