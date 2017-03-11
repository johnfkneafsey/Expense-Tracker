import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import DatePicker from 'react-bootstrap-date-picker';
import Store from '../store';


export class ExpenseInput extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
    	this.handleChange = this.handleChange.bind(this);
    	this.componentDidUpdate = this.componentDidUpdate.bind(this);
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


  	handleChange(value, formattedValue) {
    	console.log({
    	  value: value, 
     	  formattedValue: formattedValue 
    	});
 	}

    componentDidUpdate() {
    var hiddenInputElement = document.getElementById("example-datepicker");
	}

  	onSubmit(event) {
  		event.preventDefault();
  		let expenseDollars = parseInt((this.refs.dollars).value.trim());
        let expenseCategory = (this.refs.expenseCategory).value.trim();
        let expenseDescription = (this.refs.description).value.trim();
        let dateSelected = document.getElementById("example-datepicker").getAttribute('data-formattedvalue');
	    this.props.dispatch(actions.asyncAddExpense(expenseDollars, expenseCategory, expenseDescription, dateSelected));
	    this.refs.dollars.value = "";
	    this.refs.expenseCategory.value = "";
	    this.refs.description.value = "";
		this.props.dispatch(actions.asyncFetchAllTransactions());
	}

  	render() {	

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}
			
		let options = this.props.categories.map((category,index)=>{
			return (
				<option key={index} value={category.name} className="center-input-text">{category.name.capitalize()}</option>
			);
		})

		return (
			<div className="component">
				<div className="page-header makeColoredHeader">
				<h1 className="stepHeaders">Step 3:</h1>
				<h3 className="steps">Input your expenses</h3>
				</div>
				<div>
					<form onSubmit={this.onSubmit}>
						<label className="datePicker">When did it occur?</label>
						<p></p>						
						<DatePicker  id="example-datepicker" ref="datePicked" onChange={this.handleChange} />
							<p></p>	
						<label> What did it cost? </label>
						<p></p>						
						<input type="text" className="form-control" ref="dollars" placeholder="Enter dollar amount" required/>
						<p></p>		

						<label className="category" >How would you categorize this?</label>
						<p></p>						
	      		
						  <select name="expenseCategory" id='expenseCategory' className="form-control center-dropdown" value={this.value} ref="expenseCategory" required>
	      						{options}
	        			</select>
						<p></p>		
						
					<label> Describe the expense </label>
						<p></p>											
					<input type="text" className="form-control" ref="description" placeholder="Enter a description" required/>
						<p></p>
						<input type="submit" className="btn btn-primary"/>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories
});

export default connect(mapStateToProps)(ExpenseInput);
