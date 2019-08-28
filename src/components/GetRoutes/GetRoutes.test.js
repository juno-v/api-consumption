import React from 'react';
import { shallow } from 'enzyme';
import GetRoutes from "./GetRoutes"; 
import { findDataTest } from "./../../../Utilities/Utilities"; 

describe(`getDirections Component`, () => {
    it(`It should render without any errors`, () => {
    const component = shallow(<GetRoutes />);
    const wrapper = findDataTest(component, `fetchDataContainerDiv`);
    // expect(wrapper.length).toBe(2); // this test will fail
    expect(wrapper.length).toBe(1); 
    })
})