import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import {Radar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';

export class ExpenseChart extends React.Component {
	constructor(props) {
    	super(props);
  	}

      radarData () {
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
            totalExpensesCategory.push(key.capitalize());
            totalExpensesAmount.push(totalExpenses[key]);
            for (let i=0; i<this.props.goals.length; i++) {
                let temp = this.props.goals[i].category;
                if (key === temp) {
                   totalExpenseBudgets.push(this.props.goals[i].goal)                              
                }
            }
        }

        let summedExpenses = totalExpensesAmount.reduce((a, b) => {
            return a + b;
        }, 0);

        let radarData = {
            labels: totalExpensesCategory,
            options: {
                scaleFontSize : 26,scaleFontColor : 'rgb(51,51,51)'}               
            ,
            datasets: [
                {
                label: 'Budget',
                backgroundColor: 'rgba(45,126,127,0.20)',
                borderColor: 'rgb(44,62,80)',
                pointBackgroundColor: 'rgb(44,62,80)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(44,62,80)',
                options: {scaleFontSize : 26,scaleFontColor : 'rgb(51,51,51)'},
                data: totalExpenseBudgets

                },
                {
                label: 'Spent',
                backgroundColor: 'rgba(79,250,127,0.20)',
                borderColor: 'rgb(24,188,156)',
                pointBackgroundColor: 'rgb(24,188,156)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                options: {scaleFontSize : 26,scaleFontColor : 'rgb(51,51,51)'},                
                pointHoverBorderColor: 'rgb(24,188,156)',
                data: totalExpensesAmount
                }
            ]
        };
        return radarData;        
      }


      doughnutData () {
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
            totalExpensesCategory.push(key.capitalize());
            totalExpensesAmount.push(totalExpenses[key]);      
            for (let i=0; i<this.props.goals.length; i++) {
                let temp = this.props.goals[i].category;
                if (key === temp) {
                   totalExpenseBudgets.push(this.props.goals[i].goal)                              
                }
            }
        }

        let summedExpenses = totalExpensesAmount.reduce((a, b) => {
            return a + b;
        }, 0);

        let doughnutData = {
            labels: totalExpensesCategory,
            options: {
                legend:{display: true,labels:{fontSize:100,boxWidth:100}}},
            datasets: [{
                data: totalExpensesAmount,
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#66ff66',
                '#9933ff'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#66ff66',
                '#9933ff'
                ]
            }]
        };

        return doughnutData;

      }

//  Needs:  Two arrays 
//                -dates - array of all dates between user inputted start and end. 
//                      -Take begin/end from displayTransactions component.  Start and end date from form, iterate through array.
//                -totalDailyExpenses - array of all expenses per day.  Will have to sum amounts for days with multiple expenses.  Will have to give '0' for days with no expenses.
//                      -define empty array
 //                     -Take begin/end from displayTransactions component.  Start and end date from form, iterate through array.                                   
//                      -Roll through days and search for !expenses for each day, if true, + x amount to total vr defined at begining.  
//                      -push that var to the array.
//
//

      lineData () {
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
            
            for (let i=0; i<this.props.goals.length; i++) {
                let temp = this.props.goals[i].category;
                console.log(temp, 'SHOULD BE CATEGORY NAME')
                console.log(this.props.goals[i], 'THIS IS TEMP BIG CAT')
                if (key === temp) {
                   totalExpenseBudgets.push(this.props.goals[i].goal)                              
                }
            }
        }

        console.log(totalExpenses, "TOTAL EXPENSES")

        let summedExpenses = totalExpensesAmount.reduce((a, b) => {
            return a + b;
        }, 0);

        console.log(totalExpensesCategory, 'CATEGORY ARRAY');
        console.log(totalExpensesAmount, 'EXPENSES ARRAY');
        console.log(totalExpenseBudgets, 'GOALS ARRAY');
        console.log(summedExpenses, 'SUMMED EXPENSES')

        let lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        return lineData;

      }



      render () {



          return (
            <div className="component">
                <div>
                    <h3>Spent vs. Budgeted by Category</h3>
                    <Radar className="chart" data={this.radarData()} />
                    <h3>Expeditures by Category</h3>
                    <Doughnut className="chart" data={this.doughnutData()} />
                    <Line className="chart" data={this.lineData()} />
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