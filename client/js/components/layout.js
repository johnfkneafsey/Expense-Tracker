import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import DisplayTransactions from './display-transactions';
import ExpenseSummary from './expense-summary';
import ExpenseChart from './expense-chart';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

// import Login from './sign-in';

export class Layout extends React.Component {
	constructor(props) {
    	super(props);
  	}

	componentDidMount() {
		this.props.dispatch(actions.asyncFetchAllTransactions());
	}

	// add back login
	render() { 

		return (
			<div className="allText">
				<section name="ExpenseCategoryList"  id="ExpenseCategoryList" data-section-name="ExpenseCategoryList">
					< ExpenseCategoryList  />
				</section>
				<section name="CategoryGoals"  id="CategoryGoals"  data-section-name="CategoryGoals">
					< CategoryGoals />
				</section>
				<section name="ExpenseInput"  id="ExpenseInput"  data-section-name="ExpenseInputtop">
					< ExpenseInput />
				</section>
				<section name="ExpenseSummary"  id="ExpenseSummary"  data-section-name="ExpenseSummary">
					< ExpenseSummary />
				</section>
				<section name="DisplayTransactions"  id="DisplayTransactions" data-section-name="DisplayTransactions">
					< DisplayTransactions />
				</section>
				<section name="ExpenseChart"  id="ExpenseChart"  data-section-name="ExpenseChart">
					< ExpenseChart />
				</section>

			</div>	
		)
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


