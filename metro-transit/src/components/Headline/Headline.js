import React, { Component } from 'react';

class Headline extends Component {
    state = { 

    }

    render() { 

        const { header, description } = this.props; 
        if(!header) {
            return null; 
        };

        return ( 
            <div data-test="headlineComponent">
                <h1 data-test="header">
                    {header}
                </h1>

                <p data-test="description">
                    {description}
                </p>
            </div>
         );
    }
}
 
export default Headline;