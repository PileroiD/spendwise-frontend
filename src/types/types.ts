export interface User {
	id: string;
	email: string;
	registeredAt: string;
}

export interface Record {
	accountId: string;
	accountName: string;
	amount: number;
	createdAt: string;
	description: string;
	id: string;
	imageUrl: string;
	title: string;
	type: string;
	userId: string;
}

export interface Account {
	id: string;
	amount: number;
	createdAt: string;
	imageUrl: string;
	initialAmount: number;
	title: string;
	records: Record[];
	user: User;
}

export interface AccountsResponse {
	accounts: Account[];
	error: Error | null;
}
