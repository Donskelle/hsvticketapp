import React from 'react';

import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width
import {APIAUTH} from './authkeys'


export class Matches extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };


  componentDidMount() {
    fetch("https://sonic-harbor-186917.appspot.com/matches", {
      headers: new Headers(APIAUTH)
    })
      .then(data => data.json())
      .then(matches => {
        this.setState({
          matches
        })
      })
  }


  constructor() {
    super();


    this.state = {
      matches: null
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <Icon color="white" name="store" size={62} />
          <Text style={styles.heading}>Hier gibs Tickets</Text>
        </View>


        {this.state.matches
          ? this.state.matches.map((m, i) => <Card title={m.title} key={i}><Button title="Scan" onPress={() => this.props.navigation.navigate('Search', {
            url: m.url,
            title: m.title,
          })} /></Card>)
          : <ActivityIndicator />}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F80E1',
    paddingTop: 40,
    paddingBottom: 10
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
});