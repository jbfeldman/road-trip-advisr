import React from 'react';

import RouteMap from './RouteMap';
import Filters from './Filters';
import ActivityInfo from './ActivityInfo';

export default class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayRestaurants: true,
            displayAttractions: true,
            restaurants: [],
            attractions: [],
            dataReceived: false,
            activeActivity: undefined,
            
        };

        this.bindThisToFunctionsPassedAsParameters();

        this.pingServer();
    }

    bindThisToFunctionsPassedAsParameters() {
        this.handleDisplayRestaurantsToggle = this.handleDisplayRestaurantsToggle.bind(this);
        this.handleDisplayAttractionsToggle = this.handleDisplayAttractionsToggle.bind(this);
        this.setActiveActivity = this.setActiveActivity.bind(this);
    }

    pingServer() {
        let center = this.findCenter();
        const body = JSON.stringify({
            lat: center.lat.toString(),
            lng: center.lng.toString(),
            height: '100',
            width: '100',
            // height: (Math.abs(center.lat - this.props.startLocation.lat) * 60).toString(),
            // width: (Math.abs(center.lng - this.props.startLocation.lng) * 60).toString()
        });
        console.log(body);
        fetch("/restaurants", {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setState({
                restaurants: data.data,
            });
        });

        fetch("/attractions", {
            method: 'POST',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setState({
                attractions: data.data,
            });
        });
    }

    findCenter() {
        return ({
            lat: ((this.props.endLocation.lat + this.props.startLocation.lat) / 2),
            lng: ((this.props.endLocation.lng + this.props.startLocation.lng) / 2)
        });
    }

    render() {
        return (
            <div>
                <Filters
                    displayRestaurants={this.state.displayRestaurants}
                    displayAttractions={this.state.displayAttractions}
                    onRestaurantsToggle={this.handleDisplayRestaurantsToggle}
                    onAttractionsToggle={this.handleDisplayAttractionsToggle}
                />
                <RouteMap
                    attractions={this.state.attractions}
                    restaurants={this.state.restaurants}
                    endLocation={this.props.endLocation}
                    startLocation={this.props.startLocation}
                    displayRestaurants={this.state.displayRestaurants}
                    displayAttractions={this.state.displayAttractions}
                    setActiveActivity={this.setActiveActivity}
                />
                {this.buildActivityInfo()}
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

    buildActivityInfo() {
        if (this.state.activeActivity) {
            return (
                <ActivityInfo activity={this.state.activeActivity} />
            );
        } else {
            return '';
        }
    }

    setActiveActivity(data) {
        console.log(data.activity);
        this.setState({
            activeActivity: data.activity,
        });
    }
}
