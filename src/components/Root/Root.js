import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  Text,
  View,
  Image
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

export default class Root extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require('../../assets/logo-en.png')}/>
        </View>
        <TouchableOpacity style={styles.buttonContainer}
          onPress={() => this.props.navigator.navigate('Login')}>
          <Text style={styles.buttonText} >LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}
          onPress={() => this.props.navigator.navigate('Register')}>
          <Text style={styles.buttonText} >REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb600',
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    width: 300,
    height: 80,
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: '#da9c03',
    marginBottom: 15,
    marginHorizontal: 15,
  },
  buttonText: {
    textAlign: 'center',
  }
});
