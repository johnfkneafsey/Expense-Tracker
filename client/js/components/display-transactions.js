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
	
				
		// dispatch action to state to set "DisplayTransactions" to "true"
		// How do we display transactions by category?
		//		-Probably easier to query the database than control individual states... 
	}
	
	render() {
		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		});
		let listOfTransactions = [];
		if (this.props.tempResults[0]) {
			this.props.tempResults[0].forEach((transaction, index) => {
				console.log(transaction, index, "TRANSACTION AND INDEX");
				listOfTransactions+= `<li key=${index}>${transaction.category}</li>`
				
		})

		}
		console.log(listOfTransactions, "LIST OF TRANSACTIONS");
		console.log(this.props.tempResults[0]);
		console.log(this.props.tempResults[0], "this.props.tempResults[0].MAP((transaction...");

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