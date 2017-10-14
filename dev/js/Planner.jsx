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
            activites: [],
        };

        this.bindThisToFunctionsPassedAsParameters();

        this.pingServer();
    }

    bindThisToFunctionsPassedAsParameters() {
        this.handleDisplayRestaurantsToggle = this.handleDisplayRestaurantsToggle.bind(this);
        this.handleDisplayAttractionsToggle = this.handleDisplayAttractionsToggle.bind(this);
        this.setActiveActivity = this.setActiveActivity.bind(this);
        this.addToActivities = this.addToActivities.bind(this);
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
        // console.log(body);
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
            // console.log(data);
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
            // console.log(data);
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
        // console.log(this.state.activities);
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
                <ActivityInfo
                    activity={this.state.activeActivity}
                    checked={false}
                    onClick={this.addToActivities}
                />
            );
        } else {
            return '';
        }
    }

    setActiveActivity(data) {
        // console.log(data.activity);
        this.setState({
            activeActivity: data.activity,
        });
    }

    getRouteURL() {
        let url = "https://www.google.com/maps/dir/?api=1&origin=";
        url = url.concat(JSON.stringify(startLocation.lat));
        url = url.concat(",");
        url = url.concat(JSON.stringify(startLocation.lng));
        url = url.concat("&");
        
        for (i = 0; i < activities.length; i++)
        {
            if (i == 0) {
                url = url.concat("waypoint=")
            }
            else {
                url = url.concat("|");
            }
            url = url.concat(activities[i].lat);
            url = url.concat(",");
            url = url.concat(activities[i].lng);
            if (i == (activities.length - 1)) {
                url = url.concat("&");
            }
        }
        url = url.concat("destination=");
        url = url.concat(JSON.stringify(endLocation.lat));
        url = url.concat(",");
        url = url.concat(JSON.stringify(endLocation.lng));

        return url;
    }

    addToActivities(dump, data) {
        let activity = data.activity;
        let coords = {
            lat: activity.latitude,
            lng: activity.longitude,
        };
        let attractions = this.state.attractions;
        let restaurants = this.state.restaurants;
        let index = this.idOf(activity.location_id, attractions);
        if (index >= 0) {
            attractions.splice(index, 1);
        }
        index = this.idOf(activity.location_id, restaurants);
        if (index >= 0) {
            restaurants.splice(index, 1);
        }
        let activities = this.state.activities;
        if (activities === undefined) {
            activities = [coords];
        } else {
            activities.push(coords);
        }
        // console.log(activities, restaurants, attractions);
        this.setState({
            activities,
            restaurants,
            attractions,
            activeActivity: undefined,
        });
    }

    idOf(id, restaurants) {
        let it = 0;
        for (let r of restaurants) {
            // console.log(r, id);
            if (r.location_id === id) {
                return it;
            }
            it++;
        }
        return -1;
    }
}
