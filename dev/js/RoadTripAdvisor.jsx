import React from 'react';

import { Menu } from 'semantic-ui-react';

import RouteForm from './RouteForm';
import Planner from './Planner';

export default class RoadTripAdvisor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: undefined,
            end: undefined,
        };

        this.bindThisToFunctionsPassedAsParameters();
    }

    bindThisToFunctionsPassedAsParameters() {
        this.setLocations = this.setLocations.bind(this);
    }

    render() {
        if (this.state.start) {
            return (
                <Planner
                    startLocation={state.start}
                    endLocation={state.end}
                />
            );
        } else {
            return (
                <RouteForm
                    onLocationsSet={this.setLocations}
                />
            );
        }
    }

    setLocations(x, y) {
        console.log(x, y);
    }
}
