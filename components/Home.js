import React, { Component } from 'react';
import {
    ScrollView,
    Text
} from 'react-native';
import CustomerList from './CustomerList';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <CustomerList navigation={this.props.navigation}></CustomerList>
            </ScrollView>
            )
    }
}