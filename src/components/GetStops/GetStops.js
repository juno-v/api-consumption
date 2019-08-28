import React, { Component } from 'react';
import "./GetStops.scss"; 
import GetTimepointDepartures from "../GetTimepointDepartures/GetTimepointDepartures"; 

class GetStops extends Component {
    state = { 
        leavingFrom: this.props.leavingFrom, 
        selectedDirection: this.props.selectedDirection, 
        routeNumber: this.props.routeNumber, 
        stopOptions: '', 
        selectedStop: '', 
        selectedStopname: '',
        GetTimepointDepartures: false, 
    }

    // fetching stops available for the selected route and direction passed from props 
    async getDirection () {
        try {
          
          let routeNumber = parseInt(this.state.routeNumber); 
          let direction = parseInt(this.state.selectedDirection); 
    
          let response = await fetch(`http://svc.metrotransit.org/NexTrip/Stops/${routeNumber}/${direction}?format=json`);
    
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          else { 
            response.json().then((data) => {
                this.setState({
                  stopOptions: data, 
                })
            });
          }
        }
    
        catch { 
          console.log('we have in error in fetchData component!!!!');
        }
      }

      // retrieving the selected bus stop to update state 
      // to use for fetching the depart times for a bus's: 
      // route
      // direction 
      // stop 
      selectGoingTo = (event) => {
          console.log(`Going to:`, event.target.name)

          this.setState({
              ...this.state, 
              selectedStop: event.target.value, 
              selectedStopname: event.target.name, 
              GetTimepointDepartures: !this.state.GetTimepointDepartures, 
          })
      }

    // fetch stop once component is mounted 
    componentDidMount () {
        this.getDirection(); 
    }

    render() { 
        return ( 
            <div 
            id="scrollToStops"
            data-test="fetchStopContainerDiv"
            className="fetchStopContainerDiv">
                <div className="stopHeader">
                  <h1> Select a 
                    <span className="underlineStop"> stop </span>
                     leaving from {this.state.leavingFrom} {this.props.directionName}
                    </h1>
                </div>
                <hr/>
                {this.state.stopOptions.length > 0 ?
                this.state.stopOptions.map((route, index) => {
                    return( 
                        <div
                        className="routeOptions"
                        key={index}>
                            <p>{route["Text"]}</p>
                            {/* <p>{route["Value"]}</p> */}

                            <a href="#scrollToDepartureTimes">
                              <button
                              onClick={this.selectGoingTo}
                              value={route["Value"]}
                              name={route["Text"]}>
                                  SELECT THIS STOP
                              </button>
                            </a>
                        </div>
                    )
                }) : null} 

                {this.state.GetTimepointDepartures ?

                <GetTimepointDepartures 
                leavingFrom={this.state.leavingFrom}
                selectedDirection={this.state.selectedDirection} 
                selectedStop={this.state.selectedStop}
                selectedStopname={this.state.selectedStopname}
                routeNumber={this.state.routeNumber} /> 
                :
                null }
            </div>
         );
    }
}
 
export default GetStops;