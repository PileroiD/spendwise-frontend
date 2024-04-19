export const selectAccountNames = (state) =>
    state.accounts.accounts.map((account) => ({
        accountName: account.title,
        accountId: account.id,
    }));
