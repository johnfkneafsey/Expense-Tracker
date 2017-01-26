import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import SubmitDay from './submit-day';
import DisplayTransactions from './display-transactions';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class Layout extends React.Component {
	constructor(props) {
    	super(props);
  	}

	componentDidMount() {
		let categoryPromise = fetch('/category');
		let goalsPromise = fetch('/goal');
		let expensePromise = fetch('/expense');
		this.props.dispatch(actions.asyncFetchDb(expensePromise));
		setTimeout(()=> { console.log(store.getState(), "Attempting to get entire DB to store")}, 3000)
	}

	render() { 

		return (
			<div className="layoutClass">
				<h1 className="page-title">Mint Lite</h1>
				< ExpenseCategoryList  />
				< CategoryGoals />
				< ExpenseInput />
				< DisplayTransactions />
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses,
	tempResults: state.tempResults,
	currentCategory: state.currentCategory

});

export default connect(mapStateToProps)(Layout);