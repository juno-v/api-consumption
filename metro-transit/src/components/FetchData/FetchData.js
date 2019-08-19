import React, { Component } from 'react';

class FetchData extends Component {
  state = { 
    routeList: '', 
  }

  async getRoutes () {
    try {

      let response = await fetch('http://svc.metrotransit.org/NexTrip/5/4/7SOL');

      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;

      // inserting a console.log here temporarily to avoid exxessive API calls. 
      // website states do not request more than once every 30 seconds. 
      // console.log(`hello world`); 

      }

      else {
        response.text().then(function(data){
          // console.log(data);
          
          // create object to parse
          let parser = new DOMParser(); 

          let xmlDoc = parser.parseFromString(data, 'text/xml'); 
          // console.log(xmlDoc.getElementsByTagName('NexTripRoute'));
          // console.log(xmlDoc.getElementsByTagName('Description'));
          console.log(xmlDoc);

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

