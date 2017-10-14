import React from 'react';

import RouteMap from './RouteMap';

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
        return <Header>hi</Header>
    }
}
