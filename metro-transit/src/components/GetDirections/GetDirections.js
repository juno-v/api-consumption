import React, { Component } from 'react';
import "./GetDirections.scss"; 
import GetStops from "../GetStops/GetStops"; 

class GetDirections extends Component {
    state = { 
        routeNumber: this.props.routeNumber, 
        leavingFrom: this.props.leavingFrom, 
        directionOptions: '', 
        selectedDirection: '', 
        showGetStopsComponent: false, 
    }

    // fetch direction options for the selected route passed from props. 
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

    // retrieving the selected route direction to update state
    // to use for fetching the stops available for the selected route and direction 
    selectRouteDirection = (event) => {
        console.log(`Route direction:`, event.target.value);

        this.setState({
            ...this.state, 
            selectedDirection: event.target.value, 
            showGetStopsComponent: !this.state.showGetStopsComponent, 
        })
    }

    // fetch route's direction options once component is mounted 
    componentDidMount () {
        this.getDirection(); 
    }

    render() { 
        return ( 
            <div className="fetchDirectionContainerDiv">
                <p> SELECT A DIRECTION </p>
                <hr/> 
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
                }) : 
                <p> This route doesn't have any stops schedule.
                     Please select a different rounte. </p>} 

                {this.state.showGetStopsComponent ?

                <GetStops 
                leavingFrom={this.state.leavingFrom}
                selectedDirection={this.state.selectedDirection}
                routeNumber={this.state.routeNumber} /> 
                :
                null }
            </div>
         );
    }
}
 
export default GetDirections;