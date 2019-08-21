import React, { Component } from 'react';

class FetchDirection extends Component {
    state = { 
        routeID: this.props.routeID, 
        selectedRoute: this.props.selectedRoute, 
        routeDirection: '', 
    }

    async getDirection () {
        try {
          
          let routeID = parseInt(this.state.routeID); 
    
          let response = await fetch(`http://svc.metrotransit.org/NexTrip/Directions/${routeID}?format=json`);
    
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          else { 
            response.json().then((data) => {
                this.setState({
                    routeDirection: data, 
                })
            });
          }
        }
    
        catch { 
          console.log('we have in error in fetchData component!!!!');
        }
      }

      check = () => {
          console.log(`the direction object is `, this.state.routeDirection)
      }

     componentDidMount () {
         this.getDirection(); 
     }

    render() { 
        return ( 
            <div>
                <p> SELECT A DIRECTION </p>
                <p> {this.state.selectedRoute} </p>
                {this.state.routeDirection.length > 0 ?
                this.state.routeDirection.map((route, index) => {
                    return( 
                        <div key={index}>
                            <p>{route["Text"]}</p>
                            <p>{route["Value"]}</p>
                        </div>
                    )
                }) : null} 
                
                <button onClick={this.check}> CHECK </button>
            </div>
         );
    }
}
 
export default FetchDirection;