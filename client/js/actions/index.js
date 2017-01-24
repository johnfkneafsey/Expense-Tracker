export const ADD_EXPENSE_CATEGORY = 'ADD_EXPENSE_CATEGORY';
export const addExpenseCategory = (category) => ({
	type: ADD_EXPENSE_CATEGORY,
	category: category
})

export const ADD_EXPENSE_TO_TOTAL = 'ADD_EXPENSE_TO_TOTAL';
export	const addExpenseToTotal = (dollars, category) => ({
	type: ADD_EXPENSE_TO_TOTAL,
	dollars: dollars,
	category: category
})
