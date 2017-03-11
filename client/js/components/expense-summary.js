import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';



export class ExpenseSummary extends React.Component {
	constructor(props) {
    	super(props);
		this.getTotalBudget = this.getTotalBudget.bind(this);
		this.getTotalSpent = this.getTotalSpent.bind(this);
    	this.onClickBack = this.onClickBack.bind(this);
    	this.onClickNext = this.onClickNext.bind(this);
  	}


	onClickBack() {
		console.log('PREV');
		if (this.props.renderPage > 1) {
			this.props.dispatch(actions.decrementRenderView())
		}
	}

	onClickNext() {
		console.log('NEXT')
		if (this.props.renderPage < 6) {
		this.props.dispatch(actions.incrementRenderView())	
		}
	}


  	componentDidMount() {
  		this.props.dispatch(actions.asyncFetchAllGoals());
		this.props.dispatch(actions.asyncFetchAllTransactions());
  	}

	getTotalBudget() {
		let totalBudget = 0;
		for (let i = 0; i < this.props.goals.length; i++) {	
			totalBudget += this.props.goals[i].goal;	
		}
		return totalBudget;
	}

	getTotalSpent() {
		let totalSpent = 0;
		let placeholder = this.props.expenses[0];
		if (placeholder) {
			for (let i = 0; i < placeholder.length; i++) {	
				totalSpent += placeholder[i].cost;	
			}
			return totalSpent
		}
		return totalSpent;
	}


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
							<td className="category-title"><b>{goal.category.capitalize()}</b></td>
							<td className="center">${totalExpenses[otherTemp]}</td>
							<td className="center">${goal.goal}</td>
							<div className="progress">
								<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{percentageVal}" aria-valuemin="0" aria-valuemax="100" style={divStyle}> 
									{percentageVal}%
								</div>
							</div>	
						</tr>
			);
		})

		let percentageValue;
			if (Math.floor((this.getTotalSpent()/this.getTotalBudget()) * 100) > 100) {
				percentageValue = 100
			} else {
				percentageValue = Math.floor((this.getTotalSpent()/this.getTotalBudget()) * 100)
			}

		let totalDivStyle = {width: `${percentageValue}%`}

		let totals = 
			<tr>
				<td className="category-title"><b><h5>Total</h5></b></td>
				<td className="center"><b><h5>${this.getTotalSpent()}</h5></b></td>
				<td className="center"><b><h5>${this.getTotalBudget()}</h5></b></td>
				<div className="progress">
					<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{percentageValue}" aria-valuemin="0" aria-valuemax="100" style={totalDivStyle}> 
						{percentageValue}%
					</div>
				</div>
			</tr>

    return (

			<div className="component">

			<div className="page-header makeColoredHeader">
				<h3 className="steps">Summary of your expenses</h3>
			</div>
					<table className="table">
						<tr>
							<th><h4><u>Category</u></h4></th>
							<th><h4 className="center"><u className="center">Spent</u></h4></th>
							<th><h4 className="center"><u className="center">Budget</u></h4></th>
							<th className="center-percentages"><h4><u>Percent of Budget Used</u></h4></th>							
						</tr>
							{goals}
						<tr className="center-no-height">
							<td className="category-title center-no-height">__________</td>
							<td className="center"><b className="center">__________</b></td>
							<td className="center"><b className="center">__________</b></td>
							<td className="center"><b className="center">________________________________________________________________________________</b></td>
						</tr>							
							{totals}
					</table>
			</div>
    
    )}
}


const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses
});

export default connect(mapStateToProps)(ExpenseSummary);
