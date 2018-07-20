import React, { Component } from 'react';
import {
    ScrollView,
    Text
} from 'react-native';
import CustomerDetail from './CustomerDetail';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <CustomerDetail></CustomerDetail>
            </ScrollView>
            )
    }
}