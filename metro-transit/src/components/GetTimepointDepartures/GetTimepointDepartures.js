import React, { Component } from 'react';
import "./GetTimepointDepartures.css"; 

class GetTimepointDepartures extends Component {
    state = { 
        leavingFrom: this.props.leavingFrom,
        selectedDirection: this.props.selectedDirection, 
        selectedStop: this.props.selectedStop,  
        selectedStopname: this.props.selectedStopname, 
        routeNumber: this.props.routeNumber, 
        scheduledDepartures: '',
        selectedDeparture: '', 
        showFinalResult: false,

    }

    async getDeparture () {
        try {
          
          let route = parseInt(this.state.routeNumber); 
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
                    scheduledDepartures: data, 
                })
            });
          }
        }
        catch { 
          console.log('we have in error in fetchData component!!!!');
        }
      }

      selectDeparture = (event) => {
        this.setState({
            ...this.state, 
            selectedDeparture: event.target.value, 
        })
      }

      checkFinalResult = () => {
        console.log(`check overall selections`, this.state); 
      }

     componentDidMount () {
         this.getDeparture(); 
         console.log(this.state)
     }

     departureInMinutes = (time) => {
        let date = time; 
        let convertedDate = []
        
        for(let i=0; i < date.length; i++) {
          let convert = parseInt(date[i]); 
        
          if(isNaN(convert) === false) {
            convertedDate.push(convert); 
          }
        }
        convertedDate.pop();
        convertedDate.pop();
        convertedDate.pop();
        convertedDate.pop();
        
        convertedDate = convertedDate.join(""); 
        convertedDate= parseInt(convertedDate); 
        
        let currentDate = new Date(); 
        let currentTime = currentDate.getTime();
        
        let departTime = convertedDate; 
        
        let result = departTime - currentTime; 
        
        result = result / 1000 / 60;
        
        time =  Math.floor(result); 
        return time; 
      }


    render() { 


        let direction = this.state.selectedDirection; 
        if (direction === "4") {
            direction = 'NORTH'; 
        }
        else if (direction === "3") {
            direction = 'WEST';
        }

        else if (direction === "2") {
            direction = 'EAST';
        }
        else if (direction === "1") {
            direction = 'SOUTH';
        }
        else {
            direction = 'Error, unable to retrieve direction. Try again later.'; 
        }

        let currentDateTime = new Date(); 

        return ( 
            <div>
              
                <h1> SELECT SCHEDULE DEPARTURE TIME TO: {this.state.selectedStopname}</h1>
                <hr/>

                {this.state.scheduledDepartures.length > 0 ?
                this.state.scheduledDepartures.map((stop, index) => {
                    return( 
                        <div className="stops"
                        key={index}>
                            <p>Departing in {this.departureInMinutes(stop["DepartureTime"])} minutes.</p>

                            <button
                            onClick={this.selectDeparture}
                            value={stop["DepartureTime"]}>
                                SELECT THIS STOP
                            </button>
                        </div>
                    )
                }) : null} 
                <hr/> 

                <h1 onClick={this.checkFinalResult} >DETAILS ABOUT SELECTED ROUTE</h1>
                <hr/>

                {this.state.selectedDeparture.length > 0 ? 
                <div>
                    <p>Leaving From: {this.state.leavingFrom}</p>
                    <p>Going To: {this.state.selectedStopname}</p>
                    <p>Direction: {direction} </p>
                  <p>Bus route is departing at {currentDateTime.toUTCString()} in: {this.departureInMinutes(this.state.selectedDeparture)} minutes.</p>
                </div>
                :
                <p>Please select a departure option to see your final route details!</p>}
            </div>
         );
    }
}
 
export default GetTimepointDepartures;