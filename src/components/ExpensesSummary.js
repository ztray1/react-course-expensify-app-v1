import React from "react";
import {connect} from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total"

export const ExpensesSummary=({expenseCount,expenseTotal})=>{
    const expenseWord=expenseCount===1?"expense":"expenses";
    const formattedExpensesTotal=numeral(expenseTotal/100).format("$0,0.00");
    return(
        <div>
            <h1>Viewing {expenseCount} {expenseWord} expenses totalling {formattedExpensesTotal}</h1>
        </div>
    )
}

const mapStatetProps=(state)=>{
    const visibleExpenses=selectExpenses(state.expenses,state.filters);
    return {
        expenseCount:visibleExpenses.length,
        expenseTotal:selectExpensesTotal(visibleExpenses)
    }
};

export default connect(mapStatetProps)(ExpensesSummary);