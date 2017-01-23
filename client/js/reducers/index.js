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
		let catego = action.category;
		return update(state, {
			categories: {$push: [action.category]},
			expenses: {$merge: {[action.category]: 0} }
		})
			
	}


	return state;
}