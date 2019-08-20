import React, { Component } from 'react';

class FetchData extends Component {
  state = { 
    routeList: [], 
  }

  async getRoutes () {
    try {

      // let response = await fetch('http://svc.metrotransit.org/NexTrip/5/4/7SOL');
      let response = await fetch('http://svc.metrotransit.org/NexTrip/Routes?format=json');

      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      else {
        // console.log(response);
        response.json().then((data) => {
            // console.log(data);

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
    // check to see if this.state.routeList contains the turn dat from fetching /NexTrip/Routes
    console.log(`clicked!`, this.state.routeList)
    console.log(this.state.routeList[0])
  }

  componentDidMount() {
    this.getRoutes(); 
    console.log(this.state.routeList)
  }

  render() { 

    return ( 
      <div>

        {/* test to see if stae contains the route list data */}
        {JSON.stringify(this.state.routeList[0])}

        <p>
        {this.state.routeList.length > 0 ? this.state.routeList[0]["Description"] : <p> i don't have nothing </p> }
        </p>

         <button onClick={this.test}> 
           click me
         </button>
      </div>
     );
  }
}
 
export default FetchData; 

