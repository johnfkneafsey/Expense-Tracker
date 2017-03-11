import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import {Radar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import {calendar} from '../calendar';
import DatePicker from 'react-bootstrap-date-picker';


export class ExpenseChart extends React.Component {
	constructor(props) {
    	super(props);
        this.state = {
            lineData : {
            }
        }
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

  
      onSubmit (event) {
        event.preventDefault();
        let startDate = document.getElementById("example-datepicker-start").getAttribute('data-formattedvalue');
        let endDate = document.getElementById("example-datepicker-end").getAttribute('data-formattedvalue');
        let dateArray = [];     
        for (let i = this.props.calendar.indexOf(startDate.toString()); i <= this.props.calendar.indexOf(endDate.toString()); i++) {
            dateArray.push(this.props.calendar[i]);
        }
        let expensesArray = [];
        for (let k = 0; k < dateArray.length; k++) {
            let dailyExpenses = 0;
            for (let j = 0; j < this.props.expenses[0].length; j++) {
                if (dateArray[k] == this.props.expenses[0][j].date) {
                    dailyExpenses += this.props.expenses[0][j].cost;
                }
            }
            expensesArray.push(dailyExpenses); 
        }

        let lineData = {
            labels: dateArray,
            datasets: [
                {
                label: 'Dollars Spent',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(45,126,127,0.20)',
                borderColor: 'rgb(24,188,156)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(24,188,156)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(24,188,156)',
                pointHoverBorderColor: 'rgb(24,188,156)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                fillStyle: 'rgb(24,188,156)',
                data: expensesArray
                }
            ]
        };
        this.setState({ lineData: lineData })
        }


render () {

    let lineChartDisplay
    if (this.state.lineData.labels) {
        lineChartDisplay = <Line className="chart-line" data={this.state.lineData} />
    }

          return (
            <div className="component">
			<div className="buttons">
				<button className="backNavButton glyphicon glyphicon-chevron-left" onClick={() => this.onClickBack()} >Back</button>
				<button className="nextNavButton glyphicon glyphicon-chevron-right" onClick={() => this.onClickNext()} >Next</button>
			</div>
                <div>
                    <div>
                        <h3>Spent vs. Budgeted by Category</h3>
                        <Radar className="chart" data={this.radarData()} />
                    </div>
                    <div className="chart-space">
                    </div>  
                    <div>                  
                        <h3>Expenditures by Category</h3>
                        <Doughnut className="chart" data={this.doughnutData()} />
                    </div>
                    <div className="chart-space">
                    </div>
                    <div>
                        <h3>Expenditures by Day</h3>
                        {lineChartDisplay}
                        <form onSubmit={this.onSubmit}>
                            <label className="category" >Choose a start date,</label>
                            <DatePicker  className='calendarToggle' id="example-datepicker-start" ref="datePicked" onChange={this.handleChangeStartDate} />
                            <label className="category" >...and an end date</label> 
                            <DatePicker  className='calendarToggle' id="example-datepicker-end" ref="datePicked" onChange={this.handleChangeEndDate} />
                            <input type="submit" className="btn btn-primary"/> 
                        </form> 
                    </div>                   
                </div>
            </div>
          )
      }
}

const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses,
    calendar: state.calendar,
});

export default connect(mapStateToProps)(ExpenseChart);

