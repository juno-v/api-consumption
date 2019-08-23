import React from 'react';
import { shallow } from 'enzyme';
import Header from "./Header"; 
import { findDataTest } from "./../../../Utilities/Utilities"; 

// custom function for completing shallow render on Header component 
const setUp = (props = {}) => {
    const component = shallow(<Header {...props}/>);
    return component; 
}

// 'it' test methods

describe(`Header Component`, () => {

     // before each test method, shallow render of component 
    let component; 
    beforeEach( () => {
        component = setUp(); 
    });

    it(`Should render without any errors`, () => {
        // view what shallow render is actually coding
        // console.log(`@@@@@@@ shallow render Header component`, component.debug()); 

        // check for wrapper existance, reference the className of the wrapper 
        const wrapper = findDataTest(component, `headerComponent`);

        // checkers that wrapper's length is equal to 1, there's only one className of headerComponent
        expect(wrapper.length).toBe(1);
    });

    // test to see that logo renders
    it(`Should render a logo`, () => {
        const logo = findDataTest(component, `logoImg`);
        expect(logo.length).toBe(1); 
    })
}); 