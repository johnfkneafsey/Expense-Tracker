import update from 'immutability-helper';
import * as actions from '../actions/index';
import {calendar} from '../calendar';
import store from '../store';



const initialState = {
	categories: [],
	expenses: [],
	goals: [],
	currentCategory: 'All',
	categoryTotals: [],
	calendar: calendar,
	displayTransactions: {startDate: null, endDate: null},
	renderPage: 0
}

export const mainReducer = (state= initialState, action) => {
	if (action.type === actions.ADD_EXPENSE_CATEGORY) {
		let catego = action.category
		let newGoal = {[catego]: 0}
		let newObj = {name: catego};
		setTimeout(()=> { console.log(store.getState(), "THIS IS THE CATEGORY GETSTATE")}, 3000);
		return update(state, {
			categories: {$push: [newObj]},
			categoryTotals: {$merge: {[action.category]: 0}}
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
		})		
	}
	
	if (action.type === actions.CHANGE_CURRENT_CATEGORY) {
		setTimeout(()=> { console.log(store.getState(), "This is test for change currentCategory")}, 3000);
		return update(state, {
			currentCategory: {$set: action.tempCategory}
		})
	}

	if (action.type === actions.DISPLAY_TRANSACTION_START_DATE) {
		setTimeout(()=> { console.log(store.getState(), "This is test for change display start date")}, 3000);
		return update(state, {
			displayTransactions: {$merge: {startDate: action.startDate}}
		})
	}
	
	if (action.type === actions.DISPLAY_TRANSACTION_END_DATE) {
		setTimeout(()=> { console.log(store.getState(), "This is test for change display end date")}, 3000);
		return update(state, {
			displayTransactions: {$merge: {endDate: action.endDate}}
		})
	}

	if (action.type === actions.DECREMENT_RENDER_VIEW) {
		setTimeout(()=> { console.log(store.getState(), "This is test for DECREMENT_RENDER_VIEW")}, 3000);
		return update(state, {
			renderPage: {$apply: function(x) {return x - 1}}
		})
	}

	if (action.type === actions.INCREMENT_RENDER_VIEW) {
		setTimeout(()=> { console.log(store.getState(), "This is test for INCREMENT_RENDER_VIEW")}, 3000);
		return update(state, {
			renderPage: {$apply: function(x) {return x + 1}}
		})
	}

	return state;
}