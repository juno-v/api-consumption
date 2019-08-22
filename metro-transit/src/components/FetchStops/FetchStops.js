import React, { Component } from 'react';
import "./FetchStops.css"; 
import GetTimepointDepartures from "../GetTimepointDepartures/GetTimepointDepartures"; 

class FetchStops extends Component {
    state = { 
        leavingFrom: this.props.leavingFrom, 
        selectedDirection: this.props.selectedDirection, 
        routeNumber: this.props.routeNumber, 
        stopOptions: '', 
        selectedStop: '', 
        selectedStopname: '',
        GetTimepointDepartures: false, 
    }

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

      selectGoingTo = (event) => {
          console.log(event.target.value)

          this.setState({
              ...this.state, 
              selectedStop: event.target.value, 
              selectedStopname: event.target.name, 
              GetTimepointDepartures: !this.state.GetTimepointDepartures, 
          })
      }

     componentDidMount () {
         this.getDirection(); 
     }

    render() { 
        return ( 
            <div>
                <p> SELECT A DIRECTION </p>
                <p> {this.state.leavingFrom} </p>
                {this.state.stopOptions.length > 0 ?
                this.state.stopOptions.map((route, index) => {
                    return( 
                        <div className="routeStops"
                        key={index}>
                            <p>{route["Text"]}</p>
                            <p>{route["Value"]}</p>

                            <button
                            onClick={this.selectGoingTo}
                            value={route["Value"]}
                            name={route["Text"]}>
                                SELECT THIS DIRECTION
                            </button>
                        </div>
                    )
                }) : null} 

                {this.state.GetTimepointDepartures ?

                <GetTimepointDepartures 
                leavingFrom={this.state.leavingFrom}
                selectedDirection={this.state.selectedDirection} 
                selectedStop={this.state.selectedStop}
                selectedStopname={this.state.selectedStopname} /> 
                :
                null }
            </div>
         );
    }
}
 
export default FetchStops;