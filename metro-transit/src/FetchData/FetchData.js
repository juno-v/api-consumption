// import React, { Component } from 'react';

// class FetchData extends Component {
//     render() { 
//         return fetch( 
//             `http://svc.metrotransit.org/NexTrip/{ROUTE}/{DIRECTION}/{STOP}`
//         ).then(response => response.json())
//     };
// }
 
// export default FetchData;

import axios from "axios"; 

class getProviders {
    static all() {
        return axios.get(`http://svc.metrotransit.org/NexTrip/{ROUTE}/{DIRECTION}/{STOP}`);
    }
}

export default getProviders; 