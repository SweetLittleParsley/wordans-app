import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import HomeScreen from './src/components/HomeScreen/HomeScreen'
import Login from './src/components/Login/Login'

const uri = 'https://wordans-mxelda46illwc0hq.netdna-ssl.com/images/responsive/img_layout/wordans_logo_desktop_EN.png';

const styles = StyleSheet.create({
  headerLogo: {
    width: 105,
    height: 30
  },
});

class CategoryScreen extends React.Component {
  render() {
    const {state} = this.props.navigation;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{state.params.name}</Text>
      </View>
    )
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: <Image style={styles.headerLogo} source={{ uri }} />,
    },
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      headerTitle: 'Category',
    },
  },
});

export default class Wordans extends Component {
  render() {
    return (
      <Login />
    );
  }
}
