import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class DisplayTransactions extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
  	}

	handleChange(event) {
		let tempCategory = (this.refs.expenseCategory).value;
		this.props.dispatch(actions.asyncFetchAllTransactions());
		this.props.dispatch(actions.changeCurrentCategory(tempCategory));
	}

	onSubmit(event) {
  		event.preventDefault();
		this.props.dispatch(actions.asyncFetchAllTransactions());
	}
	
	render() {

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		});
		let listOfTransactions;
		if (this.props.tempResults[0]) {


			if (this.props.currentCategory === "All") {
				listOfTransactions = this.props.tempResults[0].map((transaction, index) => {
					return (
					<tr key={index}><td>{transaction.date}</td><td className="center">{transaction.category.capitalize()}</td><td className="center">${transaction.cost}</td><td className="center">{transaction.description}</td></tr>
					)
				})
			} else {
				listOfTransactions = this.props.tempResults[0].filter(transaction => {
					return (transaction.category == this.props.currentCategory)}).map((transaction, index) => {
						return (
							<tr key={index}><td><bold>{transaction.date}</bold></td><td><bold>{transaction.category}</bold></td><td><bold>${transaction.cost}</bold></td><td><bold>{transaction.description}</bold></td></tr>
						)
				})
			}
		


		}

	return (
		<div className="component">
			<div className="page-header makeColoredHeader">

				<h3 className="steps">View detailed information about your expenses here</h3>
			</div>
			<form onSubmit={this.onSubmit}>
				<label>Sort by category</label>
						<p></p>						

				<select name="expenseCategory" id='expenseCategory' className="form-control center-dropdown" value={this.value} ref="expenseCategory" onChange={this.handleChange} required>
					<option value="All">All</option>					
					{options}
				</select>
				<p></p>
				<p></p>		
				<input type="submit" className="btn btn-primary"/>
			</form>
				<p></p>
				<p></p>	
			<div>
			<table className="table table-striped">
				<thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Description</th></tr></thead>
				<tbody>
					{listOfTransactions}
				</tbody>
			</table>
			</div>
		</div>
	)}
}


const mapStateToProps = (state, props) => ({
	categories: state.categories,
	tempResults: state.tempResults,
	currentCategory: state.currentCategory
});


export default connect(mapStateToProps)(DisplayTransactions);