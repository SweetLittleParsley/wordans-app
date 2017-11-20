import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,
  TouchableWithoutFeedback, TouchableOpacity,
  Navigator, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14
import Home from './src/components/Home/Home'
import Login from './src/components/Login/Login'
import Register from './src/components/Register/Register'
import Root from './src/components/Root/Root'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb600',
  },
  navigationHeader: {
    backgroundColor: '#ffb600',
  },
});

const uri = 'https://wordans-mxelda46illwc0hq.netdna-ssl.com/images/responsive/img_layout/wordans_logo_desktop_EN.png';

class RootScreen extends React.Component {
  render() {
    return (
      <Root navigator={this.props.navigation} />
    );
  }
}
class LoginScreen extends React.Component {
  render() {
    return (
      <Login navigator={this.props.navigation} />
    );
  }
}
class RegisterScreen extends React.Component {
  render() {
    return (
      <Register navigator={this.props.navigation} />
    );
  }
}
class HomeScreen extends React.Component {
  render() {
    return (
      <Home navigator={this.props.navigation} />
    );
  }
}
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
  Root: {
    screen: RootScreen,
    navigationOptions: {
      headerStyle: styles.navigationHeader,
      headerTintColor: 'black',
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerStyle: styles.navigationHeader,
      headerTintColor: 'black',
      title: 'Login',
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerStyle: styles.navigationHeader,
      headerTintColor: 'black',
      title: 'Register',
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerStyle: styles.navigationHeader,
      headerTintColor: 'black',
      headerTitle: <Image style={styles.headerLogo} source={{ uri }} />,
    },
  },
});

export default class Wordans extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigator />
      </View>
    );
  }
}
