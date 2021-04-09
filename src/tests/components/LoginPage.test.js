import React from "react";
import {shallow} from "enzyme";
import {LoginPage} from "../../components/LoginPage"

test("should correctly render LoginPage",()=>{
    const wrapper=shallow(<LoginPage startLogin={()=>{}}/>)
    expect(wrapper).toMatchSnapshot()
})

test("should call startLogin on button click",()=>{
    const startGithubLogin=jest.fn();
    const wrapper=shallow(<LoginPage startGithubLogin={startGithubLogin}/>)
    wrapper.find("button").at(0).simulate("click");
    expect(startGithubLogin).toHaveBeenCalled();
})