import React, { Component } from 'react';
import "./GetRoutes.scss"; 
import FetchDirection from "../FetchDirection/FetchDirection"; 

class GetRoutes extends Component {
  state = { 
    routeList: [], 
    showRouteDirectionComponent: false, 
    leavingFrom: '',
    routeNumber: '', 
  }

  async getRoutes () {
    try {

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

  test = () => {
    // check to see if this.state.routeList contains the turn data from 
    // fetching /NexTrip/Routes
    console.log(`clicked!`, this.state.routeList)
    console.log(this.state.routeList[0])
  }

  componentDidMount() {
    this.getRoutes(); 
  }

  render() { 

    return ( 
      <div className="fetchDataContainerDiv">
        <div className="routeListDiv">
        <h1> Transit Routes in service for today </h1> 
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
          <p> Unable to get the route list. </p> }

        <hr/>


        {this.state.showRouteDirectionComponent ?
        <FetchDirection 
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

