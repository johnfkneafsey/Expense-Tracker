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
					<tbody key={index}><tr><td>{transaction.date}</td><td>{transaction.category}</td><td>{transaction.cost}</td><td>{transaction.description}</td></tr></tbody>
					)
				})
			} else {
				listOfTransactions = this.props.tempResults[0].filter(transaction => {
					return (transaction.category == this.props.currentCategory)}).map((transaction, index) => {
						return (
							<tbody key={index}><tr><td>{transaction.date}</td><td>{transaction.category}</td><td>{transaction.cost}</td><td>{transaction.description}</td></tr></tbody>
						)
				})
			}
		


		}

	return (
		<div>
			<h3>Display Transactions</h3>
			<form onSubmit={this.onSubmit}>
				<select name="expenseCategory" id='expenseCategory' value={this.value} ref="expenseCategory" onChange={this.handleChange} required>
					<option value="All">All</option>					
					{options}
				</select>
				<input type="submit" />
			</form>
			<table>
				<tbody><tr><th>Date</th><th>Category</th><th>Amount</th><th>Description</th></tr></tbody>
				{listOfTransactions}
			</table>
		</div>
	)}
}


const mapStateToProps = (state, props) => ({
	categories: state.categories,
	tempResults: state.tempResults,
	currentCategory: state.currentCategory
});


export default connect(mapStateToProps)(DisplayTransactions);