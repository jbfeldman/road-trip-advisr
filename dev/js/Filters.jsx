import React from 'react';

import { Form } from 'semantic-ui-react';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);

        this.bindThisToFunctionsPassedAsParameters();
    }

    bindThisToFunctionsPassedAsParameters() {

    }

    render() {
        return (
            <Form>
                <Form.Group grouped>
                    <label>Filters</label>
                    <Form.Field
                        label='Restaurants'
                        control='input'
                        checked={this.props.displayRestaurants}
                        type='checkbox'
                        onClick={this.props.onRestaurantsToggle}
                    />
                    <Form.Field
                        label='Attractions'
                        control='input'
                        checked={this.props.displayAttractions}
                        type='checkbox'
                        onClick={this.props.onAttractionsToggle}
                    />
                </Form.Group>
            </Form>
        );
    }
}
