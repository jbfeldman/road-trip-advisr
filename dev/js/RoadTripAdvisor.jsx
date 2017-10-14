import React from 'react';
import ReactDOM from 'react-dom';

import RouteForm from './RouteForm';
import Planner from './Planner';

export default class RoadTripAdvisor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            end: undefined,
            readyForPlanner: false,
            start: undefined,
        };

        this.bindThisToFunctionsPassedAsParameters();
    }

    bindThisToFunctionsPassedAsParameters() {
        this.setReadyForPlanner = this.setReadyForPlanner.bind(this);
        this.setStartLocation = this.setStartLocation.bind(this);
        this.setEndLocation = this.setEndLocation.bind(this);
    }

    render() {
        if (this.state.readyForPlanner && this.state.end && this.state.start) {
            return (
                <div>
                    <RouteForm
                        endLocation={this.state.end}
                        onEndLocationSet={this.setEndLocation}
                        onStartLocationSet={this.setStartLocation}
                        onSubmit={this.setReadyForPlanner}
                        startLocation={this.state.start}
                    />
                    <Planner
                        // endLocation={{lat: 42.3601, lng: -71.0589}}
                        // startLocation={{lat: 42.1015, lng: -72.5898}}
                        endLocation={this.state.end}
                        startLocation={this.state.start}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <RouteForm
                        endLocation={this.state.end}
                        onEndLocationSet={this.setEndLocation}
                        onStartLocationSet={this.setStartLocation}
                        onSubmit={this.setReadyForPlanner}
                        startLocation={this.state.start}
                    />
                </div>
            );
        }
    }

    setReadyForPlanner() {
        this.setState({
            readyForPlanner: true,
        });
    }

    setStartLocation(data) {
        // console.log(data);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?`+
            `address=${this.formatAddress(data.formatted_address)}`;
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                start: {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng,
                }
            });
        });
    }

    formatAddress(string) {
        return string.split(' ').join('+');
    }

    setEndLocation(data) {
        // console.log(data);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?`+
            `address=${this.formatAddress(data.formatted_address)}`;
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                end: {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng,
                }
            });
        });
    }
}
