import React from 'react';


import { StackNavigator } from 'react-navigation';
import { Matches } from './Matches';
import { Match } from './Match';



export default StackNavigator({
  Home: { screen: Matches },
  Search: { screen: Match },
},
{
  initialRouteName: 'Home',
});