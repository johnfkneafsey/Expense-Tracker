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
		return res.json();
	})
	.then(_res => {
		console.log("_RES", _res);
		return dispatch(addExpenseCategory(_res.name))
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

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (dollars, category, description, date) => ({
	type: ADD_EXPENSE,
	dollars: dollars,
	category: category,
	description: description,
	date: date
})


