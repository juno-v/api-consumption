import React, { Component } from 'react';

class FetchData extends Component {
  state = { 
    routeList: '', 
  }

  async getRoutes () {
    try {

      let response = await fetch('http://svc.metrotransit.org/NexTrip/Routes');

      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      
      }

      else {
        response.text().then(function(data){
          console.log(data); 
      })
        // console.log('hello world')
        // this.setState({
        //   ...this.state, 
        //   routeList: response.data,
        // })
      }

      // await response.json().then(function(data) {
      //   console.log('@@@@@@ the data is!!!!! :)', data.Actual);
      // });

    }

    catch { 
      console.log('we have in error in fetchData component!!!!');
    }
  }

  componentDidMount() {
    this.getRoutes(); 
  }

  render() { 
    return ( 
      <div>
        <h1> hi i'm fetching data. </h1>
        <p>
        {this.state.routeList}
        </p>
      </div>
     );
  }
}
 
export default FetchData; 

