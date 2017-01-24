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

// categories = [
// 	{name: 'entertainment'}, {name: 'utilties'}
// ] 


const initialState = {
	categories: [],
	expenses: {}
}

export const mainReducer = (state= initialState, action) => {
	if (action.type === actions.ADD_EXPENSE_CATEGORY) {
		return update(state, {
			categories: {$push: {name: [action.category]}},

//			expenses: {$merge: {[action.category]: 0} }
		})
			
	}

	if (action.type === actions.ADD_EXPENSE_TO_TOTAL) {
		// let newTotal = action.dollars + (catego)
		return update( state, {
			expenses: {[action.category]: {$apply: function(x) {return (x + Number([action.dollars]))}}}
		})
		
	}


	return state;
}