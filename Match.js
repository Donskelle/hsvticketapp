import React from 'react';


import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator,Linking } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { APIAUTH } from './authkeys'

const SCREEN_WIDTH = Dimensions.get('window').width


export class Match extends React.Component {




  componentDidMount() {
    fetch("https://sonic-harbor-186917.appspot.com/match/" + encodeURIComponent(this.props.navigation.state.params.url), {
      headers: new Headers(APIAUTH)
    })
      .then(data => data.json())
      .then(blocks => {
        this.setState({
          blocks
        })
      })
  }


  constructor(props) {
    super(props)

    this.state = {
      blocks: null,
    };
  }

  render() {
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;

    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <Icon color="white" name="store" size={62} />
          <Text style={styles.heading}>{title}</Text>
        </View>

        {
        this.state.blocks
          ? this.state.blocks.map((b, i) =>
            <Card title={b.name} key={i}>
          <Text>Freie Plätze {b.freeSeats}</Text>
          <Text>Kosten {b.price} €</Text>
          <Button title="Open" onPress={() => Linking.openURL(b.link)} />
        </Card>
        )
            : <ActivityIndicator />
        }
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