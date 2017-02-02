import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class CategoryGoals extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
  	}

  	componentDidMount() {
  		this.props.dispatch(actions.asyncFetchAllGoals());
  	}

	onSubmit(event) {
  		event.preventDefault();
  		let categoryAmount = parseInt((this.refs.dollars).value.trim());
        let goalCategory = (this.refs.expenseCategory).value.trim();
		let goalIndex = -1;
		for (let i = 0; i < this.props.goals.length; i++) {
			if ((this.props.goals[i].category) === goalCategory) {
				goalIndex = i;
			}
  		}
		if (goalIndex === -1) {
			this.props.dispatch(actions.asyncAddCategoryGoal(goalCategory,categoryAmount));
		}
		this.refs.dollars.value = "";
	};

	render() {

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name.capitalize()}</option>
			);
		})

		let categories = this.props.categories.map((category,index)=>{
				return (
					<div className="budget-checkmarks" key={index}>
						{category.name.capitalize()} 
							
					</div>
				);
			})


	return (
		<div className="component">
			<div className="page-header makeColoredHeader">
				<h1 className="stepHeaders">Step 2:</h1>
				<h3 className="steps">Define budgets for your expense categories</h3>
			</div>

			<div>
				<form onSubmit={this.onSubmit} >
					<label>Expense Category</label>
					<p></p>
						<select className="form-control center-dropdown" name="expenseCategory" id='expenseCategory' ref="expenseCategory" required>
							{options}
						</select>
						<p></p>
					<label>Category Budget</label>
					<p></p>
						<input type="text" className="form-control" placeholder="Enter dollar amount" ref="dollars" required />
						<p></p>
						<input type="submit" className="btn btn-primary"/>
				</form>
			</div>
				<p></p>

			<div className="row">
				<div className="list-group">
						{categories}
				</div>
			</div>

		</div>

	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses
});

export default connect(mapStateToProps)(CategoryGoals);