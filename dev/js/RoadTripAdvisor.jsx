import React from 'react';
import ReactDOM from 'react-dom';

import { Menu } from 'semantic-ui-react';

import RouteForm from './RouteForm';
import Planner from './Planner';

export default class RoadTripAdvisor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: undefined,
            end: undefined,
            readyForPlanner: false,
        };

        this.bindThisToFunctionsPassedAsParameters();
    }

    bindThisToFunctionsPassedAsParameters() {
        this.setReadyForPlanner = this.setReadyForPlanner.bind(this);
        this.setStartLocation = this.setStartLocation.bind(this);
        this.setEndLocation = this.setEndLocation.bind(this);
    }

    render() {
        if (readyForPlanner) {
            return (
                <Planner
                    endLocation={state.end}
                    startLocation={state.start}
                />
            );
        } else {
            return (
                <RouteForm
                    endLocation={state.end}
                    onEndLocationChange={this.setEndLocation}
                    onStartLocationChange={this.setStartLocation}
                    onSubmit={this.setReadyForPlanner}
                    startLocation={state.start}
                />
            );
        }
    }

    setReadyForPlanner() {
        this.setState({
            readyForPlanner: true,
        });
    }

    setStartLocation(x, y) {
        console.log(x, y);
    }

    setEndLocation(x, y) {
        console.log(x, y);
    }
}
