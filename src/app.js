import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import configureStore from "./store/configureStore";
import AppRouter from "./routers/AppRouter";
import React from "react";
import {addExpense} from "./actions/expenses";
import {setTextFilter,sortByAmount,sortByDate} from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import {Provider} from "react-redux";
import "react-dates/lib/css/_datepicker.css";


const store=configureStore();
store.dispatch(addExpense({description:"water bill",amount:200,createdAt:12}));
store.dispatch(addExpense({description:"gas bill",amount:105,createdAt:250}));
//store.dispatch(setTextFilter("bill"));

const state=store.getState();

const visibleExpenses=getVisibleExpenses(state.expenses,state.filters);
console.log(visibleExpenses);

/*store.subscribe(()=>{
    const state=store.getState();
    const visibleExpenses=getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
    console.log(state.filters.sortBy);
})*/

const jsx=(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('app'));
