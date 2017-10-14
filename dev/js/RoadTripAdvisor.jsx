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
                <Planner
                    endLocation={{lat: 42.3601, lng: -71.0589}}
                    startLocation={{lat: 42.1015, lng: -72.5898}}
                    // endLocation={this.state.end}
                    // startLocation={this.state.start}
                />
            );
        } else {
            return (
                <RouteForm
                    endLocation={this.state.end}
                    onEndLocationSet={this.setEndLocation}
                    onStartLocationSet={this.setStartLocation}
                    onSubmit={this.setReadyForPlanner}
                    startLocation={this.state.start}
                />
            );
        }
    }

    setReadyForPlanner() {
        this.setState({
            readyForPlanner: true,
        });
    }

    setStartLocation(dump, data) {
        console.log(dump, data);
    }

    setEndLocation(dump, data) {
        console.log(dump, data);
    }
}
