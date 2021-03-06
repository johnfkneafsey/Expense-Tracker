import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';


export class Landing extends React.Component {
	constructor(props) {
    	super(props);
    	this.onSubmit = this.onSubmit.bind(this);
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
		if (this.props.renderPage < 7) {
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
	
	return (
    <div className="container ">
            <div className="landingContainer" >
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="landingHeader" >Ready to make budgeting easy?</h1>
                        <hr className="star-primary"></hr>
                        <br></br>
                            <h2>It's as easy as  1... 2... 3...</h2>
                            <br></br>
                        <div className="stepsLanding" >
                            <h4>1. Enter categories for your expenses</h4>
                            <br></br>
                            <h4>2. Define budgets for each category</h4>
                            <br></br>
                            <h4>3. Input your expenses</h4>
                        </div>
                    <div className="buttons">
                        <button className="glyphicon glyphicon-play landingStart" onClick={() => this.onClickNext()} ></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
			
	)}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	renderPage: state.renderPage
	
});

export default connect(mapStateToProps)(Landing);
