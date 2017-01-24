export const asyncAddExpenseCategory = (category) => dispatch => {
	console.log(category, 'CATEGORY BEING PASSED');
	return fetch('/category', {
		method: 'post',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({name: category})
	})
	.then(res => {
		if (!res.ok) {
				throw new Error(res.statusText);
		}
		console.log(res.body);
		return res.name;
	})
	.then(_res => {
		return dispatch(addExpenseCategory(_res))
	})
	.catch(error => {
		return error;
	})
}

export const ADD_EXPENSE_CATEGORY = 'ADD_EXPENSE_CATEGORY';
export const addExpenseCategory = (category) => ({
	type: ADD_EXPENSE_CATEGORY,
	category: category
})

export const ADD_EXPENSE_TO_TOTAL = 'ADD_EXPENSE_TO_TOTAL';
export	const addExpenseToTotal = (dollars, category, description) => ({
	type: ADD_EXPENSE_TO_TOTAL,
	dollars: dollars,
	category: category,
	description: description
})
