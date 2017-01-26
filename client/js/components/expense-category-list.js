import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class ExpenseCategoryList extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
  	}

  	componentDidMount() {
  		this.props.dispatch(actions.asyncFetchAllCategories());
  	}

	onSubmit(category) {
		category.preventDefault();
		let textInput = (this.refs.newCategory).value.toLowerCase();
		let categoryIndex = -1;
		for (let i = 0; i < this.props.categories.length; i++) {
  			if (this.props.categories[i].name === textInput) {
  					categoryIndex = i;
  			}
		}
		if (categoryIndex === -1) {
			this.props.dispatch(actions.asyncAddExpenseCategory(textInput))
		}
		this.refs.newCategory.value = "";
	};

	render() {

	let categories = this.props.categories.map((category,index)=>{
		console.log(categories, "CATEGORIES on component page")
			return (
				<li key={index}>{category.name}</li>
			);
		})

	return (
		<div>
			<h3>Expense Categories</h3>
		
			<div className="submitNewExpenseCategory">
				<form onSubmit={this.onSubmit}>
					<label>Add A New Expense Category</label>
					<input type="text" placeholder="i.e. Food/Entertainment"
					 ref="newCategory"/>	
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
