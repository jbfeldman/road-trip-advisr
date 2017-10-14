import React from 'react';

import { Map, Marker } from 'google-maps-react';
import { Header } from 'semantic-ui-react';

const distanceZoomRatio = (7 / 10.022470662419769);

export default class RouteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.startLocation && this.state.endLocation) {
            return (
                <Map clickableIcons={false} google={google} className={'map'} zoom={7} initialCenter={this.calculateCenter()}>
                    <Marker
                        title='Start'
                        name='Start'
                        position={this.props.startLocation}
                    />
                    <Marker
                        title={'Destination'}
                        name={'Destination'}
                        position={this.props.endLocation}
                    />
                    {this.createListOfMarkers()}
                </Map>
            );
        } else {
            return <Header>Retrieving information about your route.</Header>;
        }
    }

    calculateCenter() {
        console.log(
            Math.sqrt(
                Math.pow(
                    this.props.endLocation.lat - this.props.startLocation.lat, 2)
                +
                Math.pow(
                    this.props.endLocation.lng - this.props.startLocation.lng, 2)
                ));
        return {
            lat: (this.props.startLocation.lat + this.props.endLocation.lat) / 2,
            lng: (this.props.startLocation.lng + this.props.endLocation.lng) / 2,
        };
    }

    createListOfMarkers() {
        let markers = [];
        console.log(this.props.restaurants, this.props.attractions);
        if (this.props.restaurants) {
            markers.concat(this.props.restaurants.map((l) => {
                return (
                    <Marker
                        title={l.name}
                        name={l.name}
                        position={{
                            lat: l.latitude,
                            lng: l.longitude,
                        }}
                        id={l.location_id}
                    />
                );
            }));
        }
        if (this.props.attractions) {
            markers.concat(this.props.attractions.map((l) => {
                return (
                    <Marker
                        title={l.name}
                        name={l.name}
                        position={{
                            lat: l.latitude,
                            lng: l.longitude,
                        }}
                        id={l.location_id}
                    />
                );
            }));
        }
        console.log(markers);
    }
}
