import React from 'react';

import RouteMap from './RouteMap';
import Filters from './Filters';

export default class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            attractions: [],
            dataReceived: false,
        };

        this.bindThisToFunctionsPassedAsParameters();

        this.pingServer();
    }

    bindThisToFunctionsPassedAsParameters() {
        this.handleDisplayRestaurantsToggle = this.handleDisplayRestaurantsToggle.bind(this);
        this.handleDisplayAttractionsToggle = this.handleDisplayAttractionsToggle.bind(this);
    }

    pingServer() {
        let center = this.findCenter();
        fetch("/restaurants", {
            body: JSON.stringify({
                lat: center.lat,
                lng: center.lng,
                height: (Math.abs(center.lat - this.props.startLocation.lat) * 60),
                width: (Math.abs(center.lng - this.props.startLocation.lng) * 60)
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        });
    }

    findCenter() {
        return ({
                lat: ((this.props.endLocation.lat + this.props.startLocation.lat) / 2),
                lng: ((this.props.endLocation.lng + this.props.startLocation.lng) / 2)
            });
        );
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
