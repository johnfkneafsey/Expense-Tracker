import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import DatePicker from 'react-bootstrap-date-picker';
import store from '../store';


export class DisplayTransactions extends React.Component {
	constructor(props) {
    	super(props);
		this.onClick = this.onClick.bind(this);
		this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
		this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		this.props.dispatch(actions.asyncFetchCalendar());
		this.props.dispatch(actions.asyncFetchAllTransactions());
	} 

  	handleChangeStartDate(value, formattedValue) {
		this.props.dispatch(actions.displayTransactionStartDate(formattedValue));
 	}

  	handleChangeEndDate(value, formattedValue) {		
		this.props.dispatch(actions.displayTransactionEndDate(formattedValue));
 	}


	onClick(expenseId) {
		this.props.dispatch(actions.asyncDeleteExpense(expenseId));
		this.props.dispatch(actions.asyncFetchAllTransactions());
	}

	handleChange() {
		let tempCategory = (this.refs.expenseCategory).value;
		this.props.dispatch(actions.asyncFetchAllTransactions());
		this.props.dispatch(actions.changeCurrentCategory(tempCategory));
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
				for (let i = this.props.calendar.indexOf(this.props.displayTransactions.startDate); i <= this.props.calendar.indexOf(this.props.displayTransactions.endDate); i++) {
					if (this.props.calendar[i] === transaction.date) {	
						return (
							<tr key={index}><td className="left">{transaction.date}</td><td className="left">{transaction.category.capitalize()}</td><td className="left">${transaction.cost}</td><td className="left">{transaction.description}</td><td><button className="glyphicon glyphicon-remove left" onClick={() => this.onClick(transaction.id)} value={transaction.id} type="submit"></button></td></tr>
				)
				}}})
			} else {
				listOfTransactions = this.props.expenses[0].filter(transaction => {
					return (
						transaction.category == this.props.currentCategory)}).map((transaction, index) => {
							for (let i = this.props.calendar.indexOf(this.props.displayTransactions.startDate); i < this.props.calendar.indexOf(this.props.displayTransactions.endDate); i++) {
							if (this.props.calendar[i] === transaction.date) {
								return (
									<tr key={index}><td><bold>{transaction.date}</bold></td><td><bold>{transaction.category.capitalize()}</bold></td><td><bold>${transaction.cost}</bold></td><td><bold>{transaction.description}</bold></td><td><button className="glyphicon glyphicon-remove" onClick={() => this.onClick(transaction.id)} value={transaction.id} type="button"></button></td></tr>
								)
			}}})}}


	return (
		<div className="component">
			<div className="buttons">
				<button className="backNavButton glyphicon glyphicon-chevron-left" onClick={() => this.onClickBack()} >Back</button>
				<button className="nextNavButton glyphicon glyphicon-chevron-right" onClick={() => this.onClickNext()} >Next</button>
			</div>
			<div className="page-header makeColoredHeader">
				<h3 className="steps">Your Expense History</h3>
			</div>
			<form >
				<label>Choose a category,</label>
						<p></p>						

				<select name="expenseCategory" id='expenseCategory' className="form-control center-dropdown" value={this.value} ref="expenseCategory" onChange={this.handleChange} required>
					<option value="All">All</option>					
					{options}
				</select>
				<p></p>
				<p></p>
			
				<label className='' >a start date,</label>
				<p></p>

				<p></p>
				<DatePicker  className='calendarToggle' id="example-datepicker-start"   ref="datePicked" onChange={this.handleChangeStartDate}   placeholderText={this.props.displayTransactions.startDate} />
				<label className='' >and an end date</label>
				<DatePicker  className='calendarToggle' id="example-datepicker-end"   ref="datePicked" onChange={this.handleChangeEndDate}   placeholderText={this.props.displayTransactions.endDate}/>
				<p></p>	
	
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
	calendar: state.calendar,
	displayTransactions: state.displayTransactions
});


export default connect(mapStateToProps)(DisplayTransactions);