import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import DatePicker from 'react-bootstrap-date-picker';
import store from '../store';

export class DisplayTransactions extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  	}

	componentDidMount() {
		this.props.dispatch(actions.asyncFetchCalendar());
		this.props.dispatch(actions.asyncFetchAllTransactions());
	} 

  	handleChangeStartDate(value, formattedValue) {
    	console.log({
    	  value: value, 
     	  formattedValue: formattedValue 
    	}, 'START DATE LOG');
 	}

  	handleChangeEndDate(value, formattedValue) {
    	console.log({
    	  value: value, 
     	  formattedValue: formattedValue 
    	}, 'END DATE LOG');
 	}

	onSubmit (event) {
		event.preventDefault();
		let tempCategory = (this.refs.expenseCategory).value;
		let startDate = document.getElementById("example-datepicker-start").getAttribute('data-formattedvalue');	
		let endDate = document.getElementById("example-datepicker-end").getAttribute('data-formattedvalue');
		this.props.dispatch(actions.asyncFetchAllTransactions());
		this.props.dispatch(actions.changeCurrentCategory(tempCategory));	
	}

	onSubmitStart () {
		let startDate = document.getElementById("example-datepicker-start").getAttribute('data-formattedvalue');
		return startDate;
	}

	onSubmitEnd () {
		let endDate = document.getElementById("example-datepicker-end").getAttribute('data-formattedvalue');
		return endDate;
	}

	onClick(expenseId) {
		this.props.dispatch(actions.asyncDeleteExpense(expenseId));
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
		if (this.props.expenses[0]) {
			if (this.props.currentCategory === "All") {
				listOfTransactions = this.props.expenses[0].map((transaction, index) => {
					for (let i = this.props.calendar.indexOf(this.onSubmitStart()); i <= this.props.calendar.indexOf(this.onSubmitEnd()); i++) {
						if (this.props.calendar[i] === transaction.date) {			
					return (
						<tr key={index}><td>{transaction.date}</td><td className="center">{transaction.category.capitalize()}</td><td className="center">${transaction.cost}</td><td className="center">{transaction.description}</td><td><button className="glyphicon glyphicon-remove" onClick={() => this.onClick(transaction.id)} value={transaction.id} type="submit"></button></td></tr>
					)
				}}})
			} else {
				listOfTransactions = this.props.expenses[0].filter(transaction => {
					return (
						transaction.category == this.props.currentCategory)}).map((transaction, index) => {
							for (let i = this.props.calendar.indexOf(this.onSubmitStart()); i < this.props.calendar.indexOf(this.onSubmitEnd()); i++) {
							if (this.props.calendar[i] === transaction.date) {
								return (
									<tr key={index}><td><bold>{transaction.date}</bold></td><td><bold>{transaction.category.capitalize()}</bold></td><td><bold>${transaction.cost}</bold></td><td><bold>{transaction.description}</bold></td><td><button className="glyphicon glyphicon-remove" onClick={() => this.onClick(transaction.id)} value={transaction.id} type="button"></button></td></tr>
								)
			}}} )}}


	return (
		<div className="component">
			<div className="page-header makeColoredHeader">

				<h3 className="steps">View detailed information about your expenses</h3>
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
			
				<label className='' >Choose a beginning and end date (showing all dates by default)</label>
				<p></p>

				<p></p>
				<DatePicker  className='calendarToggle' id="example-datepicker-start" value={new Date().toISOString()} ref="datePicked" onChange={this.handleChangeStartDate} />
				<DatePicker  className='calendarToggle' id="example-datepicker-end" value={new Date().toISOString()} ref="datePicked" onChange={this.handleChangeEndDate} />
				<p></p>	
				<input type="submit" className="btn btn-primary"/>
	
			</form>
				<p></p>
				<p></p>	
			<div>
			<table className="table">
				<thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Description</th><th>Remove</th></tr></thead>
				<tbody>
					{listOfTransactions}
				</tbody>
			</table>
			</div>
		</div>
		)
	}
}


const mapStateToProps = (state, props) => ({
	categories: state.categories,
	tempResults: state.tempResults,
	currentCategory: state.currentCategory,
	expenses: state.expenses,
	calendar: state.calendar
});


export default connect(mapStateToProps)(DisplayTransactions);