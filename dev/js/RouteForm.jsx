import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from 'semantic-ui-react';

export default class RouteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label> Begin your trip at: </label>
                    <Input 
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
                    type = 'submit' 
                    onClick = {this.props.onSubmit}> 
                    Let's Go! </Button>
            </Form>
        )
    }
}
