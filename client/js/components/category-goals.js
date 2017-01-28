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

						// <div className="progress">
						// 	<div className="progress-bar" role="progressbar" aria-valuenow="{percentageVal}" aria-valuemin="0" aria-valuemax="100" style={divStyle}> 
						// 		{percentageVal}%
						// 	</div>
						// </div>

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
		let divStyle = {width: '60%'}
		
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

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name.capitalize()}</option>
			);
		})

		let goals = this.props.goals.map((goal,index)=>{
			let otherTemp = goal.category;
			let percentageVal;
			if (Math.floor((totalExpenses[otherTemp]/goal.goal) * 100) > 100) {
				percentageVal = 100
			} else {
				percentageVal = Math.floor((totalExpenses[otherTemp]/goal.goal) * 100)
			}

			
			let divStyle = {width: `${percentageVal}%`}
			return (
						<tr key={index}>
							<td>{goal.category.capitalize()}</td>
							<td className="center">{goal.goal}</td>
							<td className="center">{totalExpenses[otherTemp]}</td>
						
							<div className="progress">
								<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{percentageVal}" aria-valuemin="0" aria-valuemax="100" style={divStyle}> 
									{percentageVal}%
								</div>
							</div>	
						</tr>
			);
		})

	return (
		<div>
			<div className="page-header makeColoredHeader">
				<h2>Category Budgets</h2>
				<h5 className="steps">Step 2: Define budgets for your categories</h5> 
			</div>
			<div >
				<form onSubmit={this.onSubmit} >
					<label>Expense Category</label>
						<select className="form-control" name="expenseCategory" id='expenseCategory' ref="expenseCategory" required>
							{options}
						</select>
						<p></p>
					<label>Category Budget</label>
						<input type="text" className="form-control" placeholder="Enter dollar amount" ref="dollars" required />
						<p></p>
						<input type="submit" className="btn btn-primary"/>
				</form>
			</div>
				<p></p>
				<p></p>
				<p></p>
			<div>
				<div>
			<div className="page-header makeColoredHeader">
				<h2>Expenses Summary</h2>
				<h5 className="steps">View a high-level summary of your expenses here</h5>
			</div>
					<table className="table">
						<tr>
							<th><h4>Category</h4></th>
							<th><h4>Budget</h4></th>
							<th><h4>Spent</h4></th>
							<th><h4>Percent of Budget Used</h4></th>							
						</tr>

							{goals}

					</table>
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