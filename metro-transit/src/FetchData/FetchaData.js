import React, { Component } from 'react';

class FetchData extends Component {
    state = { 
        dataArray: [], 
        arrayIsFetched: false, 
     }

    render() { 
        return ( 
            <div>
                <h1>fetch data here</h1> 
            </div>
         );
    }
}
 
export default FetchData;