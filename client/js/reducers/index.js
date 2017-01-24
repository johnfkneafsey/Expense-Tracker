import update from 'immutability-helper';
import * as actions from '../actions/index';

// const newData = update(myData, {
//   x: {y: {z: {$set: 7}}},
//   a: {b: {$push: [9]}}
// });

const initialState = {
	categories: [],
	expenses: {}
}

export const mainReducer = (state= initialState, action) => {
	if (action.type === actions.ADD_EXPENSE_CATEGORY) {
		return update(state, {
			categories: {$push: [action.category]},
			expenses: {$merge: {[action.category]: 0} }
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