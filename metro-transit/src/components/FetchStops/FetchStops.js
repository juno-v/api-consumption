import React, { Component } from 'react';
import "./FetchStops.css"; 
// import FetchStops from "../FetchStops/FetchStops"; 

class FetchStops extends Component {
    state = { 
        routeID: this.props.routeID, 
        selectedRoute: this.props.selectedRoute, 
        directionOptions: '', 
        selectedDirection: '', 
        showGetStopsComponent: false, 
    }

    async getDirection () {
        try {
          
          let routeID = parseInt(this.state.routeID); 
          let direction = parseInt(this.state.selectedDirection); 
    
          let response = await fetch(`http://svc.metrotransit.org/NexTrip/Stops/${routeID}/${direction}?format=json`);
    
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
                <p> {this.state.selectedRoute} </p>
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
                selectedRoute={this.state.selectedDirection} /> 
                :
                null }
                
                <button onClick={this.check}> CHECK </button>
                
            </div>
         );
    }
}
 
export default FetchStops;