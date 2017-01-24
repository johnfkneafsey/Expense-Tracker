import update from 'immutability-helper';
import * as actions from '../actions/index';
// INITIAL STATE {
// expenses = [
// 	{
// 		category: 'entertainment',
// 		cost: 100,
// 		description: 'bar'
// 	}
// ]

// categories = [{
// 	name: 'entertainment',
// }] 
// }

const initialState = {
	categories: [],
	expenses: []
}

export const mainReducer = (state= initialState, action) => {
	if (action.type === actions.ADD_EXPENSE_CATEGORY) {
		var index = -1;
		for (let i = 0; i < state.categories.length; i++) {
			console.log(state.categories[i].name)
			console.log(state.categories[i].name === action.category);
  			if (state.categories[i].name === action.category) {
  					index = i;
  					console.log(index);
  			}

		}
		if (index === -1) {
			let catego = action.category
			let newObj = {name: catego};
			return update(state, {
				categories: {$push: [newObj]}
  			})
//			expenses: {$merge: {[action.category]: 0} }
		}
			
	}

	if (action.type === actions.ADD_EXPENSE_TO_TOTAL) {
		// let newTotal = action.dollars + (catego)
		let amount = action.dollars;
		let catego = action.category;
		let descript = action.description;
		let newObj = {category: catego, cost: amount, description: descript};
		return update(state, {
			expenses: {$push: [newObj]}
		})

		
	}


	return state;
}