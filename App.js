import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import Login from './components/Login';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';

const RootStack = createStackNavigator({
  Login: { screen : Login },
  CustomerList: { screen : CustomerList},
  CustomerDetail: { screen : CustomerDetail},
  Home: { screen : Home}
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
  cardStyle: ''
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
