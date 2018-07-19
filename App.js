import React, { Component } from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import Login from './components/Login';
import Home from './components/Home';

const RootStack = createStackNavigator({
  Login: { screen : Login },
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
