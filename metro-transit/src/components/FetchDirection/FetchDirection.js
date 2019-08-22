import React, { Component } from 'react';
import "./FetchDirection.css"; 
import FetchStops from "../FetchStops/FetchStops"; 

class FetchDirection extends Component {
    state = { 
        routeNumber: this.props.routeNumber, 
        leavingFrom: this.props.leavingFrom, 
        directionOptions: '', 
        selectedDirection: '', 
        showGetStopsComponent: false, 
    }

    async getDirection () {
        try {
          
          let routeNumber = parseInt(this.state.routeNumber); 
    
          let response = await fetch(`http://svc.metrotransit.org/NexTrip/Directions/${routeNumber}?format=json`);
    
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          else { 
            response.json().then((data) => {
                this.setState({
                    directionOptions: data, 
                })
            });
          }
        }
    
        catch { 
          console.log('we have in error in fetchData component!!!!');
        }
      }

      selectRouteDirection = (event) => {
          console.log(`Route direction:`, event.target.value);

          this.setState({
              ...this.state, 
              selectedDirection: event.target.value, 
              showGetStopsComponent: !this.state.showGetStopsComponent, 
          })
      }

     componentDidMount () {
         this.getDirection(); 
     }

    render() { 
        return ( 
            <div className="fetchDirectionContainerDiv">
                <p> SELECT A DIRECTION </p>
                <p> {this.state.leavingFrom} </p>
                {this.state.directionOptions.length > 0 ?
                this.state.directionOptions.map((route, index) => {
                    return( 
                        <div className="routeDirection"
                        key={index}>
                            <ul>
                                <li> {route["Text"]} </li>
                            </ul>

                            <button
                            onClick={this.selectRouteDirection}
                            value={route["Value"]}>
                                SELECT THIS DIRECTION
                            </button>
                        </div>
                    )
                }) : null} 

                {this.state.showGetStopsComponent ?

                <FetchStops 
                leavingFrom={this.state.leavingFrom}
                selectedDirection={this.state.selectedDirection}
                routeNumber={this.state.routeNumber} /> 
                :
                null }
            </div>
         );
    }
}
 
export default FetchDirection;