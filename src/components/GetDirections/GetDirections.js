import React, { Component } from 'react';
import "./GetDirections.scss"; 
import GetStops from "../GetStops/GetStops"; 

class GetDirections extends Component {
    state = { 
        routeNumber: this.props.routeNumber, 
        leavingFrom: this.props.leavingFrom, 
        directionOptions: '', 
        selectedDirectionNumber: '', 
        selectedDirectionName: '', 
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
            selectedDirectionNumber: event.target.value, 
            selectedDirectionName: event.target.name, 
            showGetStopsComponent: !this.state.showGetStopsComponent, 
        })
    }

    // fetch route's direction options once component is mounted 
    componentDidMount () {
        this.getDirection(); 
    }

    render() { 
        return ( 
            <div 
            className="fetchDirectionContainerDiv">
                <div 
                id="scrollToDirections"
                className="directionHeader"> 
                    <h1> Select a 
                        <span className="underlineDirection"> direction </span> 
                        leaving from: {this.state.leavingFrom} 
                    </h1>
                </div>

                {this.state.directionOptions.length > 0 ?
                this.state.directionOptions.map((route, index) => {
                    return( 
                        <div
                        className="routeDirection"
                        key={index}>
                            <ul>
                                <li> 
                                    {route["Text"]} 

                                    <a href="#scrollToStops">
                                        <button
                                        className="selectRouteButton"
                                        onClick={this.selectRouteDirection}
                                        value={route["Value"]}
                                        name={route["Text"]} >
                                            Select this direction 
                                        </button> 
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )
                }) : 
                <p> This route doesn't have any stops schedule.
                     Please select a different route. </p>} 

                {this.state.showGetStopsComponent ?

                <GetStops 
                leavingFrom={this.state.leavingFrom}
                selectedDirection={this.state.selectedDirectionNumber}
                routeNumber={this.state.routeNumber}
                directionName={this.state.selectedDirectionName}
                 /> 
                :
                null }
            </div>
         );
    }
}
 
export default GetDirections;