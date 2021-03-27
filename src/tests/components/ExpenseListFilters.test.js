import React from "react";
import {shallow} from "enzyme";
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import {filters,altFilters} from "../fixtures/filters";
import { ExpenseList } from "../../components/ExpenseList";
import moment from "moment"

let setTextFilter, sortByDate,sortByAmount,setStartDate,setEndDate,wrapper;

beforeEach(()=>{
    setTextFilter=jest.fn();
    sortByDate=jest.fn();
    sortByAmount=jest.fn();
    setStartDate=jest.fn();
    setEndDate=jest.fn();
    wrapper=shallow(
        <ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />
    );
})

test("should show ExpenseListFilters",()=>{
    expect(wrapper).toMatchSnapshot();
})

test("should show ExpenseListFilters with alt data correctly",()=>{
    wrapper.setProps({
        filters:altFilters
    })
    expect(wrapper).toMatchSnapshot();
})

test("should handle text change",()=>{
    const value="hello world";
    wrapper.find("input").at(0).simulate("change",{
        target:{value}
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test("should sort by date",()=>{
    const value="date"
    wrapper.setProps({
        filters:altFilters
    })
    wrapper.find("select").simulate("change",{
        target:{value}
    })
    expect(sortByDate).toHaveBeenLastCalledWith()
})

test("should sort by amount",()=>{
    const value="amount"
    wrapper.find("select").simulate("change",{
        target:{value}
    })
    expect(sortByAmount).toHaveBeenLastCalledWith()
})

test("should handle date changes",()=>{
    const startDate=moment(0).subtract(4,"days")
    const endDate=moment(0).add(4,"days")
    wrapper.find("DateRangePicker").prop("onDatesChange")({startDate,endDate})
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test("should handle date focus change",()=>{
    const calendarFocused="enddate"
    wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused)
    expect(wrapper.state("calendarFocused")).toBe(calendarFocused)
})

