import React, { Component } from 'react';
import "./GetTimepointDepartures.css"; 

class GetTimepointDepartures extends Component {
    state = { 
        selectdRoute: this.props.route, 
        selectedDirection: this.props.direction, 
        selectedStop: this.props.selectedStop, 
        scheduledDeparture: '', 
    }

    async getDeparture () {
        try {
          
          let route = parseInt(this.state.selectdRoute); 
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
                    scheduledDeparture: data, 
                })
            });
          }
        }
        catch { 
          console.log('we have in error in fetchData component!!!!');
        }
      }

      check = () => {
        console.log(this.state.stops)
      }

     componentDidMount () {
         this.getDeparture(); 
     }

    render() { 
        return ( 
            <div>
              
                <h1 onClick={this.check}> COMPLETE DETAILS FOR STOP BELOW: </h1>

                {this.state.scheduledDeparture.length > 0 ?
                this.state.scheduledDeparture.map((stop, index) => {
                    return( 
                        <div className="stops"
                        key={index}>
                            <p>{stop["DepartureTime"]}</p>
                            <p>{stop["DepartureText"]}</p>

                            <button
                            onClick={this.selectedStop}
                            value={stop["DepartureTime"]}>
                                SELECT THIS DIRECTION
                            </button>
                        </div>
                    )
                }) : null} 
            </div>
         );
    }
}
 
export default GetTimepointDepartures;