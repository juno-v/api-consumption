import React, { Component } from 'react';
import "./GetTimepointDepartures.scss"; 

class GetTimepointDepartures extends Component {
    state = { 
        leavingFrom: this.props.leavingFrom,
        selectedDirection: this.props.selectedDirection, 
        selectedStop: this.props.selectedStop,  
        selectedStopname: this.props.selectedStopname, 
        routeNumber: this.props.routeNumber, 
        scheduledDepartures: '',
        selectedDeparture: '', 
        showFinalResult: false,

    }

    // fetch the departing time of a buses specific: 
    // - route 
    // - direction 
    // - stop 
    async getDeparture () {
        try {
          
          let route = parseInt(this.state.routeNumber); 
          let direction = parseInt(this.state.selectedDirection);
          let stop = this.state.selectedStop; 
    
          let response = await fetch(`http://svc.metrotransit.org/NexTrip/${route}/${direction}/${stop}?format=json`);
    
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          else { 
            response.json().then((data) => {
                this.setState({
                    scheduledDepartures: data, 
                })
            });
          }
        }
        catch { 
          console.log('we have in error in fetchData component!!!!');
        }
      }

      selectDeparture = (event) => {
        this.setState({
            ...this.state, 
            selectedDeparture: event.target.value, 
        })
      }

      // used for testing to see if the route's details are in state 
      checkFinalResult = () => {
        console.log(`check overall selections`, this.state); 
      }

    // fetch departure time once component is mounted
    componentDidMount () {
        this.getDeparture(); 
    }

    // compute when the next bus will be depart in minutes 
    departureInMinutes = (time) => {
      let date = time; 
      let convertedDate = []
      
      // go through each index and extract only those that are numbers 
      for(let i=0; i < date.length; i++) {
        let convert = parseInt(date[i]); 
      
        if(isNaN(convert) === false) {
          convertedDate.push(convert); 
        }
      }

      // remove the last four numbers, not used for computing minutes
      convertedDate.pop();
      convertedDate.pop();
      convertedDate.pop();
      convertedDate.pop();

      // join each index in array 
      convertedDate = convertedDate.join(""); 

      // converse the joined string array to a number 
      convertedDate = parseInt(convertedDate); 
      
      // initlized current date and time to do the math for how many minutes away
      // the bus is going to be departing at 
      let currentDate = new Date(); 
      let currentTime = currentDate.getTime();
      
      let departTime = convertedDate; 
      
      
      let result = departTime - currentTime; 
      
      // converting milliseconds to minutes 
      result = result / 1000 / 60;
      
      // decided to round down. would rather be early than late to a bus route.
      // NOTE: 
      // tested math.floor and math.ceil via Postman GET requests, 
      // seemed to get results that matched math.ceil  
      time =  Math.floor(result); 
      return time; 
    }

    // refresh windows and clear selections to search for a new route 
    searchNewRoute = () => {
      window.location.reload();
    }

    render() { 

    // convert the number from api fetches into their designated directions
    let direction = this.state.selectedDirection; 
    if (direction === "4") {
        direction = 'NORTH'; 
    }
    else if (direction === "3") {
        direction = 'WEST';
    }

    else if (direction === "2") {
        direction = 'EAST';
    }
    else if (direction === "1") {
        direction = 'SOUTH';
    }
    else {
        direction = 'Error, unable to retrieve direction. Try again later.'; 
    }

    // creating current date and time variable to reference in final result 
    // rather than having just minutes until departure
    let currentDateTime = new Date(); 

        return ( 
            <div 
            id="scrollToDepartureTimes"
            className="timePointContainerDiv">
              <div className="timePointHeader">
                <h1> Select a schedule departure time to : {this.state.selectedStopname} </h1> 
              </div>

                {this.state.scheduledDepartures.length > 0 ?
                this.state.scheduledDepartures.map((stop, index) => {
                    return( 
                        <div className="stopsDiv"
                        key={index}>
                          
                            <p>Departing in {this.departureInMinutes(stop["DepartureTime"])} minutes.</p>

                            <button
                            onClick={this.selectDeparture}
                            value={stop["DepartureTime"]}>
                                SELECT THIS STOP
                            </button>
                        </div>
                    )
                }) : 
                <p> Sorry, this route is not available today. Please refresh and select a different routue.</p>} 
                <hr/> 
                
                <div className="finalResultDiv"> 
                  <h1 onClick={this.checkFinalResult} >DETAILS ABOUT SELECTED ROUTE</h1>
                  <hr/>

                  {this.state.selectedDeparture.length > 0 ? 
                  <div>
                      <p>Leaving From: {this.state.leavingFrom}</p>
                      <p>Going To: {this.state.selectedStopname}</p>
                      <p>Direction: {direction} </p>
                      <p>Bus route is departing on {currentDateTime.toString()} in:  
                      <span className="finalDateTimeSelection">
                        {this.departureInMinutes(this.state.selectedDeparture)}  minutes.
                      </span>
                      </p>
                  </div>
                  :
                  <p> Unable to retrieve final results. Please select a departure time again. 
                    Refresh if message still persists. </p>}

                    <br/> 

                    <button 
                    onClick={this.searchNewRoute}
                    className="newRouteButton"> 
                      Search for a new route
                    </button>
                </div>
            </div>
         );
    }
}
 
export default GetTimepointDepartures;