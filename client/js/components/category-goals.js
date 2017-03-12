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
		this.getTotalBudget = this.getTotalBudget.bind(this);
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

	getTotalBudget() {
		let totalBudget = 0;
		for (let i = 0; i < this.props.goals.length; i++) {	
			totalBudget += this.props.goals[i].goal;	
		}
		return totalBudget;
	}

	render() {


		let categories = this.props.categories.map((category,index)=>{
			return (
				<div className="shrink-div">
					<p key={index} className='budgets'>{category.name.capitalize()}  :  ${this.getBudget(category.name)}</p>
					<span className={this.completeStatus(category.name) + ' centerMarks'} aria-hidden="true"></span>  
				</div>
			);
		})

		let totalBudget = 
				<b><p className='budgets'>Total  :  ${this.getTotalBudget()}</p></b>
			

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name} className="center-dropdown">{category.name.capitalize()}</option>
			);
		})

	return (
		<div>
			
			<nav id="mainNav" className="navbar navbar-default navbar-fixed-top navbar-custom">
				<div className="container">
				
					<div className="navbar-header page-scroll">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
							<span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
						</button>
						<a className="navbar-brand" href="#page-top">Easy Budget</a>
					</div>
					
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav navbar-right">
							<li className="hidden">
								<a href="#page-top"></a>
							</li>
							<li className="page-scroll">
								<a href="#portfolio">Advice</a>
							</li>
							<li className="page-scroll">
								<a href="#about">Resources</a>
							</li>
							<li className="page-scroll">
								<a href="#about">Sign In</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="green-bar"> 
				</div>
			</nav>
			<div className="container">
				<div className="component">
					<div className="buttons">
						<button className="backNavButton glyphicon glyphicon-chevron-left" onClick={() => this.onClickBack()} >Back</button>
						<button className="nextNavButton glyphicon glyphicon-chevron-right" onClick={() => this.onClickNext()} >Next</button>
					</div>
					<div className="page-header makeColoredHeader">
						<h1 className="stepHeaders">Step 2:</h1>
						<h3 className="steps">Define budgets by category</h3>
					</div>

					<div>
						<form onSubmit={this.onSubmit} >
							<label>Select a category</label>
							<p></p>
								<select className="form-control center-dropdown" name="expenseCategory" id='expenseCategory' ref="expenseCategory" required>
									{options}
								</select>
							<p></p>
							<label>Set a budget</label>
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
							{totalBudget}
					</ul>
					</div>
				</div>
			</div>
		</div>
	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses,
	renderPage: state.renderPage
});

export default connect(mapStateToProps)(CategoryGoals);