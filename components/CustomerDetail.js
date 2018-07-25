import React, { Component } from 'react';
import {ListView, Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import { ListItem, SearchBar, Badge } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class CustomerDetail extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds,
      }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const customer = navigation.getParam('customer', 'NO-ID');
        this.setState({
          customer: customer,
          dataSource: this.state.dataSource.cloneWithRows(customer.lends)
        });
    }

    renderRow (rowData, sectionID, rowID) {
        let title = 'Balance : ' + (rowData.amount - rowData.amountPaid);

        var radio_props = [];
        
        var installmentAmt = rowData.amount / rowData.noOfInstallments;
        for (var i = 1; i <= 5; i++) {
            radio_props.push({
                label: <Text> &#8377; {installmentAmt * i} </Text>,
                value: (installmentAmt * i)
            })
        }
        
        let subtitle = <RadioForm
            style={{paddingTop:8}}
            radio_props={radio_props}
            initial={0}
            onPress={(value) => {this.setState({value:value})}}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={'#a8aaad'}
            animation={false}
            />;

        let count = 
            <View style={{flexDirection: 'column', height: 70, width: 90, borderRightWidth:2}}>
                <View style={{flex: 1, flexDirection: 'row', height: 30}}>
                    <View style={{flex:2.2, height: 30, paddingLeft: 3, borderRightWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 25}}>30</Text>
                    </View>
                    <View style={{flex:2.8, height: 30, flexDirection: 'column'}}>
                        <View style={{flex:1, height: 15, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>Mar</Text>
                        </View>
                        <View style={{flex:1, height: 15, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>2018</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Badge><Text style={{color:'#f9fafc', fontSize:15}}> &#8377; {rowData.amount} </Text></Badge>
                </View>
            </View>
        return (
                <ListItem
                    hideChevron
                    button 
                    title={title}
                    subtitle={subtitle}
                    avatar={count}
                />
        )
      }

    render() {
      return (
          <ScrollView>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        </ScrollView>
      );
    }
  }

  