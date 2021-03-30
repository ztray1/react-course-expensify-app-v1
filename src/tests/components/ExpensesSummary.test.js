 import React from "react";
 import {shallow} from "enzyme";
 import {ExpensesSummary} from "../../components/ExpensesSummary";

 test("should correctly render ExpensesSummary with mutiple expenses",()=>{
    const wrapper=shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>)
    expect(wrapper).toMatchSnapshot();
 })

 test("should correctlty render ExpensesSummary with mutiple expenses",()=>{
    const wrapper=shallow(<ExpensesSummary expenseCount={23} expensesTotal={235456456456}/>)
    expect(wrapper).toMatchSnapshot();
 })