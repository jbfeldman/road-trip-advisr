import React from 'react';
import ReactDOM from 'react-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { Button, Form, Input } from 'semantic-ui-react';

export default class RouteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    render() {
        const startInput = {
            value: this.props.startLocation,
            onChange: this.props.onStartLocationChange,
        }

        return (
            <Form>
                <Form.Field>
                    <label> Begin your trip at: </label>
                    <PlacesAutocomplete
                        placeholder = 'Where you are'
                        onChange = {this.props.onStartLocationChange}
                        content = {this.props.startLocation}/>
                </Form.Field>
                <Form.Field>
                    <label> End your trip at: </label>
                    <Input
                        placeholder = 'Where you want to go'
                        onChange = {this.props.onEndLocationChange}
                        content = {this.props.endLocation}/>
                </Form.Field>
                <Button
                    type = 'button'
                    onClick = {this.props.onSubmit}>
                    Let's Go! </Button>
            </Form>
        )
    }
}
