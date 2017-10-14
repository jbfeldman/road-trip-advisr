import React from 'react';

import RouteMap from './RouteMap';
import Filters from './Filters';

export default class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayRestaurants: true,
            displayAttractions: true,
        };

        this.bindThisToFunctionsPassedAsParameters();
    }

    bindThisToFunctionsPassedAsParameters() {
        this.handleDisplayRestaurantsToggle = this.handleDisplayRestaurantsToggle.bind(this);
        this.handleDisplayAttractionsToggle = this.handleDisplayAttractionsToggle.bind(this);
    }

    render() {
        return (
            <div>
                {/* <Filters
                    displayRestaurants={this.state.displayRestaurants}
                    displayAttractions={this.state.displayAttractions}
                    onRestaurantsToggle={this.handleDisplayRestaurantsToggle}
                    onAttractionsToggle={this.handleDisplayAttractionsToggle}
                /> */}
                <RouteMap
                    endPosition={{lat: 37.778519, lng: -112.405640}}
                    startPosition={{lat: 37.759703, lng: -122.428093}}
                    locations={[]}
                    // endPosition={this.props.endLocation}
                    // startPosition={this.props.startLocation}
                />
            </div>
        );
    }

    handleDisplayRestaurantsToggle() {
        this.setState({
            displayRestaurants: !(this.state.displayRestaurants),
        });
    }

    handleDisplayAttractionsToggle() {
        this.setState({
            displayAttractions: !(this.state.displayAttractions),
        });
    }
}
