import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import SubmitDay from './submit-day';
import WeeklyReport from './weekly-report';

export default function Layout (props) {
// render() vs return?
	return (
		<div className="layoutClass">
			<h1 className="page-title">page title</h1>
			< ExpenseCategoryList  />
			< CategoryGoals />
			< ExpenseInput />
			< SubmitDay />
			< WeeklyReport />
		</div>
	);
}