import React, { Component } from 'react';
import "./FetchDirection.css"; 
import FetchStops from "../FetchStops/FetchStops"; 

class FetchDirection extends Component {
    state = { 
        routeNumber: this.props.routeNumber, 
        leavingFromr: this.props.leavingFromr, 
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
          console.log(event.target.value)
          this.setState({
              ...this.state, 
              selectedDirection: event.target.value, 
              showGetStopsComponent: !this.state.showGetStopsComponent, 
          })
      }

      check = () => {
        //   console.log(`the direction object is `, this.state.directionOptions);
          console.log(`the selected direction is `, this.state.selectedDirection);
      }

     componentDidMount () {
         this.getDirection(); 
     }

    render() { 
        return ( 
            <div>
                <p> SELECT A DIRECTION </p>
                <p> {this.state.leavingFromr} </p>
                {this.state.directionOptions.length > 0 ?
                this.state.directionOptions.map((route, index) => {
                    return( 
                        <div className="routeDirection"
                        key={index}>
                            <p>{route["Text"]}</p>
                            <p>{route["Value"]}</p>

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
                leavingFromr={this.state.selectedDirection} /> 
                :
                null }
                
                <button onClick={this.check}> CHECK </button>
                
            </div>
         );
    }
}
 
export default FetchDirection;