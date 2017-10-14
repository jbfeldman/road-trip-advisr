import React from 'react';

import { Header } from 'semantic-ui-react';

import Map from './Map';

export default class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.bindThisToFunctionsPassedAsParameters();
    }

    bindThisToFunctionsPassedAsParameters() {

    }

    replaceSpacesWithPluses(string) {
        return string.split(' ').join('+');
    }

    render() {
        return (
            <Map
                endLocation={this.props.endLocation}
                startLocation={this.props.startLocation}
            />
        );
    }
}
