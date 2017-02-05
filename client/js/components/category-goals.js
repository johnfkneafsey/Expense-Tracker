import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class CategoryGoals extends React.Component {
	constructor(props) {
    	super(props);
		this.state = {};
    	this.onSubmit = this.onSubmit.bind(this);
    	this.completeStatus = this.completeStatus.bind(this);
		this.getBudget = this.getBudget.bind(this);
  	}

  	componentDidMount() {
		console.log('DID THIS MOTHA FUCKA MOUNT>?????111111111111111111111111')
		this.setState({massive: 'fartbaby'})
		console.log(this.state, 'CAN I GET A FARTH BABBY???');
  		this.props.dispatch(actions.asyncFetchAllGoals());
  	}


	onSubmit(event) {
  		event.preventDefault();
  		let categoryAmount = parseInt((this.refs.dollars).value.trim());
        let goalCategory = (this.refs.expenseCategory).value.trim();
		let goalIndex = -1;
		for (let i = 0; i < this.props.goals.length; i++) {
			if ((this.props.goals[i].category) === goalCategory) {
				goalIndex = i;
			}
  		}
		if (goalIndex === -1) {
			this.props.dispatch(actions.asyncAddCategoryGoal(goalCategory,categoryAmount));
		}
		this.refs.dollars.value = "";
	};

	completeStatus(goalCategory) {
		for (let i = 0; i < this.props.goals.length; i++) {
			if (goalCategory === this.props.goals[i].category) {
				console.log('ITS A MATCH OMGGG', goalCategory, ' AND ', this.props.goals[i].category)
				return 'glyphicon glyphicon-ok';
			}
		}
			return 'glyphicon glyphicon-option-horizontal';	
	}

	getBudget(categoryName) {
		for (let i = 0; i < this.props.goals.length; i++) {
			if (this.props.goals[i].category === categoryName) {
				return this.props.goals[i].goal;
			}
		}
	}

	render() {

		let categories = this.props.categories.map((category,index)=>{
			return (
				<div>
					<tr key={index} className='budgets'> <td> {category.name.capitalize()}  :  {this.getBudget(category.name)}  </td>  </tr> <span className={this.completeStatus(category.name) + ' centerMarks'} aria-hidden="true"></span>  
				</div>
			);
		})

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name.capitalize()}</option>
			);
		})

	return (
		<div className="component">
			<div className="page-header makeColoredHeader">
				<h1 className="stepHeaders">Step 2:</h1>
				<h3 className="steps">Define budgets for your expense categories</h3>
			</div>

			<div>
				<form onSubmit={this.onSubmit} >
					<label>Expense Category</label>
					<p></p>
						<select className="form-control center-dropdown" name="expenseCategory" id='expenseCategory' ref="expenseCategory" required>
							{options}
						</select>
					<p></p>
					<label>Category Budget</label>
					<p></p>
						<input type="text" className="form-control" placeholder="Enter dollar amount" ref="dollars" required />
						<p></p>
						<input type="submit" className="btn btn-primary"/>
				</form>
			</div>
				<p></p>
			<div>
			<ul>
					{categories}
			</ul>
			</div>
		</div>

	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses
});

export default connect(mapStateToProps)(CategoryGoals);