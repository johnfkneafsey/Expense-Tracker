import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

export class ExpenseInput extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
  	}

  	onSubmit(event) {
  		event.preventDefault();
  		let expenseDollars = parseInt((this.refs.dollars).value.trim());
        let expenseCategory = (this.refs.expenseCategory).value.trim();
        let expenseDescription = (this.refs.description).value.trim();
        console.log(expenseDollars, expenseCategory, expenseDescription);
        this.props.dispatch(actions.addExpenseToTotal(expenseDollars, expenseCategory, expenseDescription));
  	}

  	render() {		
		let options = this.props.categories.map((category,index)=>{
			return (
				<option key={index} value={category.name}>{category.name}</option>
			);
		})

		return (
			<div>Expense Input
				<form onSubmit={this.onSubmit}>
					<label> Expense Amount </label>
					<input type="text" ref="dollars"required/>


					<label className="category" >Expense Category?</label>
      					<select name="expenseCategory" id='expenseCategory' value={this.value} ref="expenseCategory" required>
      						{options}
        				</select>

					<label> Expense Description </label>
					<input type="text" ref="description" required/>
					<input type="submit" />
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories
});

export default connect(mapStateToProps)(ExpenseInput);

