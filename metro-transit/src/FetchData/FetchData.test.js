import getProviders from "./FetchData"; 
import axios from "axios"; 


jest.mock(`axios`); 

test(`Returns a list of area Transit providers.`, () => {
  const providerList = [{
    "Actual":true,
    "BlockNumber":2147483647,
    "DepartureText":"String content",
    "DepartureTime":"\/Date(928167600000-0500)\/",
    "Description":"String content",
    "Gate":"String content",
    "Route":"String content",
    "RouteDirection":"String content",
    "Terminal":"String content",
    "VehicleHeading":2147483647,
    "VehicleLatitude":12678967.543233,
    "VehicleLongitude":12678967.543233
  }];
  const response = {data : providerList};

  axios.get.mockImplementation( () => Promise.resolve(response));

  return getProviders.all.then(data => expect(data).toEqual(providerList)); 
});

