import React, { Component } from 'react';
import "./GetRoutes.scss"; 
import GetDirections from "../GetDirections/GetDirections"; 

class GetRoutes extends Component {
  state = { 
    routeList: [], 
    showRouteDirectionComponent: false, 
    leavingFrom: '',
    routeNumber: '', 
  }

  async getRoutes () {
    try {

      // fetch list of Metro Transit routes in services for the day
      let response = await fetch('http://svc.metrotransit.org/NexTrip/Routes?format=json');

      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      else { 
        response.json().then((data) => {
            this.setState({
              routeList: data, 
            })
        });
      }
    }

    catch { 
      console.log('we have in error in fetchData component!!!!');
    }
  }

  // retrieving the route number to update state  
  // to use for fetching the direction of the route 
  getRouteDirection = (event) => {
    console.log(`LEAVING from route`, event.target.name);
    console.log(`Route number`, event.target.value);

    this.setState({
      ...this.state, 
      showRouteDirectionComponent: !this.state.showRouteDirectionComponent, 
      routeNumber: event.target.value, 
      leavingFrom: event.target.name, 
    })
  }

  // check to see if data from fetching route list exists
  test = () => {
    console.log(`clicked!`, this.state.routeList)
  }

  // fetch route list once component mounts 
  componentDidMount() {
    this.getRoutes(); 
  }

  render() { 

    return ( 
      <div className="fetchDataContainerDiv">
        <div className="routeListDiv">
        <div className="routeListHeader"> <h1> Metro transit routes in service for today </h1>  </div>
        <hr/> 


        {this.state.routeList.length > 0 ? 
        this.state.routeList.map((route, index) => {
          return(
            <div key={index}> 
              {route["Description"]} 

              <button
              onClick={this.getRouteDirection}
              value={route["Route"]} 
              name={route["Description"]} 
              > SELECT </button>
            </div>
          )
        }) : 
          <h1> Currently getting list of routes in service for the day. 
          Please reload or try again later if this message continues to display. </h1> }

        <hr/>


        {this.state.showRouteDirectionComponent ?
        <GetDirections 
        routeNumber={this.state.routeNumber}
        leavingFrom={this.state.leavingFrom} /> 
        :
        null }
        </div>
      </div>
     );
  }
}
 
export default GetRoutes; 

