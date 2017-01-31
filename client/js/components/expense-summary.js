import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';


export class ExpenseSummary extends React.Component {
	constructor(props) {
    	super(props);
  	}

  	componentDidMount() {
  		this.props.dispatch(actions.asyncFetchAllGoals());
  	}


    render() {

    
		let totalExpenses = {}
		let divStyle = {width: '60%'}
		
		for (let i=0; i<this.props.categories.length; i++) {
			let temp = this.props.categories[i].name;
			totalExpenses[temp] = 0;
			for(let k=0; k<this.props.expenses[0].length; k++){
				let newTemp = this.props.expenses[0];
				if (newTemp[k].category === temp) {
					totalExpenses[temp] += newTemp[k].cost;
				}
			}
		}

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let options = this.props.categories.map((category, index) => {
			return (
				<option key={index} value={category.name}>{category.name.capitalize()}</option>
			);
		})

		let goals = this.props.goals.map((goal,index)=>{
			let otherTemp = goal.category;
			let percentageVal;
			if (Math.floor((totalExpenses[otherTemp]/goal.goal) * 100) > 100) {
				percentageVal = 100
			} else {
				percentageVal = Math.floor((totalExpenses[otherTemp]/goal.goal) * 100)
			}

			let divStyle = {width: `${percentageVal}%`}
			return (
						<tr key={index}>
							<td><b>{goal.category.capitalize()}</b></td>
							<td className="center">${totalExpenses[otherTemp]}</td>
							<td className="center">${goal.goal}</td>
							<div className="progress">
								<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{percentageVal}" aria-valuemin="0" aria-valuemax="100" style={divStyle}> 
									{percentageVal}%
								</div>
							</div>	
						</tr>
			);
		})

    return (

    
			<div className="component">

			
			<div className="page-header makeColoredHeader">
				<h3 className="steps">Expenses Summary</h3>
			</div>
					<table className="table">
						<tr>
							<th><h4><u>Category</u></h4></th>
							<th><h4><u>Spent</u></h4></th>
							<th><h4><u>Budget</u></h4></th>
							<th className="center-percentages"><h4><u>Percent of Budget Used</u></h4></th>							
						</tr>

							{goals}

					</table>

			</div>



    
        )
    }
}


const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses
});

export default connect(mapStateToProps)(ExpenseSummary);