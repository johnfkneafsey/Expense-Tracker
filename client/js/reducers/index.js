import update from 'immutability-helper';
import * as actions from '../actions/index';
import store from '../store';

//goals: [
//	{food: 0},
//	{rent: 0}	
//]

const initialState = {
	categories: [],
	expenses: [],
	goals: [],
	tempResults: [],
	currentCategory: 'All'
}

export const mainReducer = (state= initialState, action) => {
	if (action.type === actions.ADD_EXPENSE_CATEGORY) {
			let catego = action.category
			let newGoal = {[catego]: 0}
			let newObj = {name: catego};
			setTimeout(()=> { console.log(store.getState(), "THIS IS THE CATEGORY GETSTATE")}, 3000);
			return update(state, {
				categories: {$push: [newObj]},
  			})
		}

	if (action.type === actions.ADD_EXPENSE) {
		let amount = action.dollars;
		let catego = action.category;
		let descript = action.description;
		let expenseDate = action.date;
		let newObj = {category: catego, cost: amount, description: descript, date: expenseDate};
		setTimeout(()=> { console.log(store.getState(), "THIS IS THE EXPENSE GETSTATE")}, 3000);
		return update(state, {
			expenses: {$push: [newObj]}
		})	
	}

	if (action.type === actions.ADD_CATEGORY_GOAL) {
		var categoryIndex = -1;
		for (let i = 0; i < state.goals.length; i++) {
			  if (Object.keys(state.goals[i]) === action.category) {
  					categoryIndex = i;
  			}
		}
		let amount = action.dollars;
		let catego = action.category;
		let newObj = {category: catego, goal: amount};
		setTimeout(()=> { console.log(store.getState(), "THIS IS THE GOAL GETSTATE")}, 3000);
		return update(state, {
			goals: {$push: [newObj]}
			})
	}
	if (action.type === actions.FETCH_ALL_CATEGORIES) {
		let categories = action.categories;
		setTimeout(()=> { console.log(store.getState(), "THIS IS THE FETCH categories GETSTATE")}, 3000);
		return update(state, {
			categories: {$set: categories}
		})		
	}
	if (action.type === actions.FETCH_ALL_GOALS) {
		let goals = action.goals;
		setTimeout(()=> { console.log(store.getState(), "THIS IS THE FETCH goals GETSTATE")}, 3000);
		return update(state, {
			goals: {$set: goals}
		})		
	}
	if (action.type === actions.FETCH_ALL_TRANSACTIONS) {
		let transactions = action.transactions;
		setTimeout(()=> { console.log(store.getState(), "THIS IS THE FETCH transactions GETSTATE")}, 3000);
		return update(state, {
			expenses: {$set: [transactions]},
			tempResults: {$set: [transactions]}
		})		
	}
	if (action.type === actions.CHANGE_CURRENT_CATEGORY) {
		setTimeout(()=> { console.log(store.getState(), "This is test for change currentCategory")}, 3000);
		return update(state, {
			currentCategory: {$set: action.tempCategory}
		})
	}

	if (action.type === actions.FETCH_DB) {
		return update (state: {$set: action.db})
	}

	return state;
}