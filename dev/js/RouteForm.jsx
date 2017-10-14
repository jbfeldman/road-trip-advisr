import React from 'react';
import ReactDOM from 'react-dom';

import Autocomplete from 'react-google-autocomplete';
import { Button, Card, Form, Input } from 'semantic-ui-react';

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
            <Card>
                <Form>
                    <Form.Field>
                        <label> Begin your trip at: </label>
                        <Autocomplete
                            placeholder='Where you are'
                            onPlaceSelected={this.props.onStartLocationSet}
                            content = {this.props.startLocation}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label> End your trip at: </label>
                        <Autocomplete
                            placeholder = 'Where you want to go'
                            onPlaceSelected={this.props.onEndLocationSet}
                            content = {this.props.endLocation}
                        />
                    </Form.Field>
                    <Button
                        type = 'button'
                        onClick = {this.props.onSubmit}
                    >
                        Let's Go!
                    </Button>
                </Form>
            </Card>
        );
    }
}
