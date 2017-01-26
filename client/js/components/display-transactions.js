import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class DisplayTransactions extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
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
			listOfTransactions = this.props.tempResults[0].map((transaction, index) => {
				console.log(transaction, "TRANSACTION AND INDEX");
				return (
				<li key={index}>{transaction.category} {transaction.description} {transaction.cost} {transaction.date} </li>
				)
			})
		}
//		console.log(listOfTransactions, "LIST OF TRANSACTIONS");
//		console.log(this.props.tempResults[0]);
//		console.log(this.props.tempResults[0], "this.props.tempResults[0].MAP((transaction...");

	return (
		<div>
			<h3>Display Transactions</h3>
			<form onSubmit={this.onSubmit}>
				<select name="expenseCategory" id='expenseCategory' value={this.value} ref="expenseCategory" required>
					<option value="all">All</option>					
					{options}
				</select>
				<input type="submit" />
			</form>
			<ul>
				{listOfTransactions}
			</ul>
		</div>
	)}
}


const mapStateToProps = (state, props) => ({
	categories: state.categories,
	tempResults: state.tempResults
});


export default connect(mapStateToProps)(DisplayTransactions);