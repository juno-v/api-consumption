import React from 'react';
import { shallow } from 'enzyme'; 
import Headline from "./Headline"; 

import { findDataTest } from "././../../../Utilities/Utilities"; 

const setUp = (props = {} ) => {
    const component = shallow(<Headline {...props} />); 
    return component; 
};

describe(`Headline Component`, () => {
    describe(`Have props`, () => {

        let wrapper; 
        beforeEach( () => {
            const props = {
                header: `Test Header`, 
                description: `Test Description`
            };
            wrapper = setUp(props); 
        });

        it(`Should render without errors`, () => {
            const component = findDataTest(wrapper, `headlineComponent`);
            expect(component.length).toBe(1); 
        });

        it(`Should render an H1`, () => {
            const h1 = findDataTest(wrapper, `header`);
            expect(h1.length).toBe(1); 
        });

        it(`Should render a description`, () => {
            const description = findDataTest(wrapper, `description`); 
            expect(description.length).toBe(1);
        });
    });

    describe(`Have NO props`, () => {
        let wrapper; 
        beforeEach( () => {
            wrapper = setUp(); 
        });

        it(`Should not render`, () => {
            const component = findDataTest(wrapper, `headlineComponent`);
            expect(component.length).toBe(0); 
        });
    }); 
    
});