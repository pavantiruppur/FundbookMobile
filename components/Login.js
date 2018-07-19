import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet
} from 'react-native';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            username : 'test',
            password : 'test'
        };
    }

    onLoginPress() {
        console.log('Login Pressed');
        console.log('Username : ' +  this.state.username);
        console.log('Password : ' +  this.state.password);
        if (this.state.username == 'test' && this.state.password == 'test') {
            console.log('LOGIN SUCCESSFUL!!!');
            console.log(this.props.navigation.navigate('Home'));
        } else {
            console.log('LOGIN FAILED!!!');
        }

    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27}}>
                    Login
                </Text>
                
                <TextInput 
                  placeholder='Username'
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({username:text})} />
                
                <TextInput placeholder='Password' 
                  secureTextEntry={true}
                  style={styles.textInput}
                  onChangeText={(text) => this.setState({password:text})} />
                
                <View style={{margin:7}} />
                
                <Button 
                        onPress={this.onLoginPress.bind(this)}
                        title="Submit"
                    />
            </ScrollView>
            )
    }
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    padding: 12,
    margin: 8
},
  red: {
    color: 'red',
  },
});