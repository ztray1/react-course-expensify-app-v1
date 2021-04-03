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
import "./firebase/firebase"


const store=configureStore();


const jsx=(
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('app'));
