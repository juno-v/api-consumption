import React from 'react';
import { shallow } from 'enzyme';
import GetDirections from "./GetDirections"; 
import { findDataTest } from "./../../../Utilities/Utilities"; 

describe(`getDirections Component`, () => {
    it(`It should render without any errors`, () => {
    const component = shallow(<GetDirections />);
    const wrapper = findDataTest(component, `fetchDirectionContainerDiv`);
    // expect(wrapper.length).toBe(2); 
    expect(wrapper.length).toBe(1); 
    })
})