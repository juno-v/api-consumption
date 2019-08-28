import React from 'react';
import { shallow } from 'enzyme';
import GetStops from "./GetStops"; 
import { findDataTest } from "./../../../Utilities/Utilities"; 

describe(`getDirections Component`, () => {
    it(`It should render without any errors`, () => {
    const component = shallow(<GetStops />);
    const wrapper = findDataTest(component, `fetchStopContainerDiv`);
    // expect(wrapper.length).toBe(2); // this test will fail
    expect(wrapper.length).toBe(1); 
    })
})