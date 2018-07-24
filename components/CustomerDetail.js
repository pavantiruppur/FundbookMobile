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
        let title = 'Amount : ' + rowData.amount + ' | Balance : ' + (rowData.amount - rowData.amountPaid);

        var radio_props = [];
        
        var installmentAmt = rowData.amount / rowData.noOfInstallments;
        for (var i = 1; i <= 5; i++) {
            radio_props.push({
                label: <Text> &#8377; {installmentAmt * i} </Text>,
                value: (installmentAmt * i)
            })
        }
        
        let subtitle = <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => {this.setState({value:value})}}
            formHorizontal={true}
            labelHorizontal={false}
            buttonColor={'#a8aaad'}
            animation={false}
            />;

        let count = <View
            borderWidth={1}
            style={{flex: .25, flexDirection: 'column', height: 70}}>
            <View borderWidth={1} style={{flex: 1, height: 35, flexDirection: 'row'}}>
                <View borderWidth={1} style={{flex:1, height: 35}}>
                    <Text>30</Text>
                </View>
                <View borderWidth={1} style={{flex:1, height: 35, flexDirection: 'column'}}>
                    <View borderWidth={1} style={{flex:1, height: 17}}>
                        <Text>Mar</Text>
                    </View>
                    <View borderWidth={1} style={{flex:1, height: 17}}>
                        <Text>2018</Text>
                    </View>
                </View>

            </View>
            
        </View>
        return (
                <ListItem
                    button 
                    roundAvatar
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

  