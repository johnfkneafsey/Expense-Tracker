import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import {Radar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

export class ExpenseChart extends React.Component {
	constructor(props) {
    	super(props);
  	}


      render () {

		String.prototype.capitalize = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		}

		let totalExpenses = {} 
		
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

        let totalExpensesCategory = [];
        let totalExpensesAmount = [];
        let totalExpenseBudgets = [];
        for (let key in totalExpenses) {
            console.log(totalExpenses[key], 'AMOUNT')
            console.log(key, 'KEY')
            totalExpensesCategory.push(key.capitalize());
            totalExpensesAmount.push(totalExpenses[key]);
            totalExpenseBudgets.push()
        }

        let summedExpenses = totalExpensesAmount.reduce((a, b) => {
            return a + b;
        }, 0);
        console.log(totalExpensesCategory, 'CATEGORY ARRAY');
        console.log(totalExpensesAmount, 'EXPENSES ARRAY');
        console.log(summedExpenses, 'SUMMED EXPENSES')

        let goals = this.props.goals.map((goal,index)=>{
                console.log(goal.goal, 'GOAL DOT GOAL');
            return (
                "hello"
            )

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







        let radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
                },
                {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
            };

        let doughnutData = {
            labels: totalExpensesCategory,
            datasets: [{
                data: totalExpensesAmount,
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#ffce56',
                '#66ff66'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#ffce56',
                '#66ff66'
                ]
            }]
        };

        
        console.log(doughnutData.datasets.data, 'THIS IS THE DATA SET FROM DONUTS')
        console.log(doughnutData.labels, 'THese ARE THE LAVBELS  FROM DONUTS')

          return (
            <div className="component">
                <div>
                    <h2>Total Expenditures by Day</h2>
                    <Radar className="chart" data={radarData} />
                    <h2>Category Breakdown</h2>
                    <Doughnut className="chart" data={doughnutData} />
                </div>
            </div>
          )
      }
}



const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses
});


export default connect(mapStateToProps)(ExpenseChart);