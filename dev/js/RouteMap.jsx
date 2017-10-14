import React from 'react';

import { Map, Marker } from 'google-maps-react';

const distanceZoomRatio = (7 / 10.022470662419769);

export default class RouteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Map clickableIcons={false} google={google} className={'map'} zoom={7} initialCenter={this.calculateCenter()}>
                <Marker
                    title='Start'
                    name='Start'
                    position={this.props.startPosition}
                />
                <Marker
                    title={'Destination'}
                    name={'Destination'}
                    position={this.props.endPosition}
                />
                {this.createListOfMarkers()}
            </Map>
        );
    }

    calculateCenter() {
        console.log(
            Math.sqrt(
                Math.pow(
                    this.props.endPosition.lat - this.props.startPosition.lat, 2)
                +
                Math.pow(
                    this.props.endPosition.lng - this.props.startPosition.lng, 2)
                ));
        return {
            lat: (this.props.startPosition.lat + this.props.endPosition.lat) / 2,
            lng: (this.props.startPosition.lng + this.props.endPosition.lng) / 2,
        };
    }

    createListOfMarkers() {
        // return this.props.locations.map((l) => {
        //     return (
        //         <Marker
        //             title=
        //     )
        // });
    }
}
