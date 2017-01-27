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

		let totalExpenses = {}
		
		for (let i=0; i<this.props.categories.length; i++) {
			let temp = this.props.categories[i].name;
			totalExpenses[temp] = 0;
			for(let k=0; k<this.props.expenses[0].length; k++){
				let newTemp = this.props.expenses[0];
				if (newTemp[k].category === temp) {
					totalExpenses[temp] += newTemp[k].cost;
				}
			}
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		})

		let goals = this.props.goals.map((goal,index)=>{
			let otherTemp = goal.category;
			return (
				<tr key={index}><td>{goal.category}</td><td>{goal.goal}</td><td>{totalExpenses[otherTemp]}</td></tr>
			);
		})

	return (
		<div><h3>Category Goals</h3>
		<div>
			<form onSubmit={this.onSubmit} id="goalForm">
				<label className="category">Expense Category?</label>
					<select name="expenseCategory" id='expenseCategory' ref="expenseCategory" required>
						{options}
					</select>
				<label className="category amount">Category Amount</label>
					<input type="text" placeholder="Enter dollar amount" ref="dollars" required />
					<input type="submit" />
			</form>
		</div>
			<table>
				<tbody><tr><th>Category</th><th>Dollars</th><th>actual</th></tr></tbody>
				{goals}
			</table>
		</div>

	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses
});

export default connect(mapStateToProps)(CategoryGoals);