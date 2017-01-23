import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Store from '../store';

export class ExpenseCategoryList extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
  	}

	onSubmit(category) {
		category.preventDefault();
		let textInput = this.textInput.value;
		this.props.dispatch(actions.addExpenseCategory(textInput))
		console.log(Store.getState());

	};

	render() {

	let categories = this.props.categories.map((category,index)=>{
			return (
				<li key={index}>{category}</li>
			);
		})

	return (
		<div>
			<h2>List of expense categories</h2>
		
			<div className="submitNewExpenseCategory">
				<form onSubmit={this.onSubmit}>
					<label>Add A New Expense Category</label>
					<input type="text" placeholder="i.e. Food/Grocery"
					ref={input => this.textInput = input}/>	
					<input type="submit" />				
				</form>
			</div>
			<ul>
				{categories}
			</ul>

		</div>
	)
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories
});

export default connect(mapStateToProps)(ExpenseCategoryList);
