import React, { Component } from 'react';

class FetchStops extends Component {
    state = { 
        selectedRoute: this.props.selectedRoute, 
    }

    render() { 
        return ( 
            <div>
               <h1> SEE A DIRECTION ??? </h1>
               <p> {this.state.selectedRoute} </p>
            </div>
         );
    }
}
 
export default FetchStops;