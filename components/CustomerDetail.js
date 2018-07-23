import React, { Component } from 'react';
import {ListView, Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

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
        console.log('************----------- ' + title);

        let subtitle = 'Subtitle';
        return (
            <ListItem
                button 
                roundAvatar
                title={title}
                subtitle={subtitle}
                avatar={{uri:'https://www.qatarliving.com/sites/all/themes/qatarliving_v3/images/avatar.jpeg'}}
            />
        )
      }

    render() {
      return (
          <ScrollView>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        </ScrollView>
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