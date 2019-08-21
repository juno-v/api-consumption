import React, { Component } from 'react';
import "./FetchData.css"; 

class FetchData extends Component {
  state = { 
    routeList: [], 
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
            </div>
          )
        }) : 
          <p> Unable to get the route list. </p> }
      </div>
     );
  }
}
 
export default FetchData; 

