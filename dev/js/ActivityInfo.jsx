import React from 'react';

import { Card, Checkbox, Image } from 'semantic-ui-react';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.activity);
        return (
            <Card>
                {this.buildHeader()}
                {this.buildMeta()}
                {this.buildDescription()}
                {this.buildCheckbox()}
            </Card>
        );
    }

    buildHeader() {
        return (
            <Card.Header>
                {this.props.activity.name}
                {this.buildRatingImage()}
            </Card.Header>
        );
    }

    buildRatingImage() {
        if (this.props.activity.rating_image_url) {
            return <Image href={this.props.activity.rating_image_url} />;
        } else {
            return '';
        }
    }

    buildMeta() {
        if (this.props.activity.price_level) {
            return (
                <Card.Meta>
                    {this.props.activity.price_level}
                </Card.Meta>
            );
        } else if (this.props.activity.category) {
            return (
                <Card.Meta>
                    {this.props.activity.category.localized_name}
                </Card.Meta>
            );
        } else {
            return '';
        }
    }

    buildDescription() {
        return (
            <Card.Description>
                {this.buildActivityDescription()}
                {this.buildLink()}
            </Card.Description>
        );
    }

    buildActivityDescription() {
        if (this.props.activity.description) {
            return this.props.activity.description
        } else {
            return '';
        }
    }

    buildLink() {
        if (this.props.activity.web_url) {
            return (
                <a target='_blank' href={this.props.activity.web_url}>
                    Click for more details.
                </a>
            );
        } else {
            return '';
        }
    }

    buildCheckbox() {
        return (
            <Checkbox
                activity={this.props.activity}
                checked={this.props.checked}
                onClick={this.props.onClick}
                label="Add to trip"
            />
        )
    }
}
