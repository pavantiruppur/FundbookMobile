import React, { Component } from 'react';
import {ListView, Text, View, StyleSheet, Image} from 'react-native';
import { ListItem } from 'react-native-elements';

export default class CustomerList extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          dataSource: ds,
      }
    }
  
    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers() {
        fetch('http://10.134.125.71:8080/orgs/1/customers')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    customers: response._embedded.customers,
                    dataSource : this.state.dataSource.cloneWithRows(response._embedded.customers)
                })
                this.state.customers.forEach((e, i) => {
                    this.fetchLends(e, i);
                });
            });
    }
    
    fetchLends(rowData, rowID) {
        fetch(rowData._links.lends.href)
            .then((response) => response.json())
            .then((response) => {
                let lends = response._embedded.lends;
                let totalAmt = 0;
                let balance = 0;
                lends.forEach((e) => {
                    totalAmt += e.amount;
                    balance += e.amount - e.amountPaid;
                });
                let newCustomers = this.state.customers.splice(0);
                let customer = newCustomers[rowID];
                customer.totalAmt = totalAmt;
                customer.balance = balance;
                customer.noOfLends = lends.length;
                this.setState({
                    customers: newCustomers,
                    dataSource : this.state.dataSource.cloneWithRows(newCustomers)
                })
            });
    }

    goToView2(){
        console.log('Navigation router run...');
      };

    renderRow (rowData, sectionID, rowID) {
        let subtitle = rowData.totalAmt && rowData.totalAmt > 0 ? 'Total : ' + rowData.totalAmt + ' | Balance : ' 
            + rowData.balance : '';
        return (
          <ListItem
            button onPress = {this.goToView2}
            roundAvatar
            key={sectionID}
            title={rowData.name}
            subtitle={subtitle}
            badge={{ value: rowData.noOfLends, textStyle: { color: 'orange' } }}
            avatar={{uri:'https://www.qatarliving.com/sites/all/themes/qatarliving_v3/images/avatar.jpeg'}}
          />
        )
      }

    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      );
    }
  }

  
class UserBrief extends Component {
    render() { 
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'https://www.qatarliving.com/sites/all/themes/qatarliving_v3/images/avatar.jpeg'}} style={styles.photo} />
                <Text style={styles.text}>
                    {`${this.props.user.name}`}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#d6d7da',
    },
    text: {
      marginLeft: 12,
      fontSize: 16,
    },
    photo: {
      height: 40,
      width: 40,
      borderRadius: 20,
    },
  });