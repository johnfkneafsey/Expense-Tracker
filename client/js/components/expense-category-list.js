import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';


export class ExpenseCategoryList extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
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
			return (
				<li key={index} className="list-group-item">{category.name.capitalize()}</li>
			);
		})

	return (
		<div className="component">
			<div className="buttons">
				<button className="backNavButton glyphicon glyphicon-chevron-left" onClick={() => this.onClickBack()} >Back</button>
				<button className="nextNavButton glyphicon glyphicon-chevron-right" onClick={() => this.onClickNext()} >Next</button>
			</div>
			<div className="page-header makeColoredHeader">
				<h1 className="stepHeaders">Step 1:</h1>
				<h3 className="steps"> Categorize your expenses</h3>
			</div>
			<div className="submitNewExpenseCategory">
				<form onSubmit={this.onSubmit}>
					<label>Add a category below</label> 
					<p></p>
					<input type="text"  className="form-control" placeholder="i.e. Food/Entertainment"
					 ref="newCategory"/>	
					 <p></p>
					<input type="submit" className="btn btn-primary"/>				
				</form>
			</div>
			<p></p>
			<div className="row">
				<div>
					<ul className="list-group">
						{categories}
					</ul>
				</div>
			</div>
				<p></p>
				<p></p>
				<p></p>
				<p></p>
				<p></p>
				<p></p>
		</div>
			
	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	renderPage: state.renderPage
	
});

export default connect(mapStateToProps)(ExpenseCategoryList);
