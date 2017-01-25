import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class CategoryGoals extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
  	}

	onSubmit(event) {
  		event.preventDefault();
  		let categoryAmount = parseInt((this.refs.dollars).value.trim());
        let expenseCategory = (this.refs.expenseCategory).value.trim();
		let goalIndex = -1;
		for (let i = 0; i < this.props.goals.length; i++) {
			if (Object.keys(this.props.goals[i])[0] === expenseCategory) {
				goalIndex = i;
			}
  		}
		if (goalIndex === -1) {
			this.props.dispatch(actions.asyncAddCategoryGoal(expenseCategory,categoryAmount));
		}
	};

	render() {
		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		})

	return (
		<div><h3>Category Goals</h3>
			<form onSubmit={this.onSubmit}>
				<label className="category">Expense Category?</label>
					<select name="expenseCategory" id='expenseCategory' value={this.value} ref="expenseCategory" required>
						{options}
					</select>
				<label className="category amount">Category Amount</label>
					<input type="text" placeholder="Enter dollar amount" ref="dollars" required />
					<input type="submit" />
			</form>
			
		</div>

	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals
});

export default connect(mapStateToProps)(CategoryGoals);