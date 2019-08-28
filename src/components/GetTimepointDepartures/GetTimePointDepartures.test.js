import React from 'react';
import { shallow } from 'enzyme';
import GetTimePointDepartures from "./GetTimePointDepartures"; 
import { findDataTest } from "../../../Utilities/Utilities"; 

describe(`getDirections Component`, () => {
    it(`It should render without any errors`, () => {
    const component = shallow(<GetTimePointDepartures />);
    const wrapper = findDataTest(component, `timePointContainerDiv`);
    // expect(wrapper.length).toBe(2); // this test will fail
    expect(wrapper.length).toBe(1); 
    })
})