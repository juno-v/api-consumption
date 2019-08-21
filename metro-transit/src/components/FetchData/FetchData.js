import React, { Component } from 'react';
import "./FetchData.css"; 
import FetchDirection from "../FetchDirection/FetchDirection"; 

class FetchData extends Component {
  state = { 
    routeList: [], 
    showRouteDirectionComponent: false, 
    selectedRoute: '',
    routeID: '', 
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
    console.log(event.target.value)
    console.log(`@@@@@@@@ SHOW ROUTE`, event.target.name)
    this.setState({
      ...this.state, 
      showRouteDirectionComponent: !this.state.showRouteDirectionComponent, 
      routeID: event.target.value, 
      selectedRoute: event.target.name, 
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
        <h1> Transit Routes in service for today </h1>

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


        {this.state.showRouteDirectionComponent ?
        <FetchDirection 
        routeID={this.state.routeID}
        selectedRoute={this.state.selectedRoute} /> 
        :
        null }
      </div>
     );
  }
}
 
export default FetchData; 

