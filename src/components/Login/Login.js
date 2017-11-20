import React, { Component } from 'react';
import { StyleSheet, View, Image,
  KeyboardAvoidingView, Keyboard,
  TouchableWithoutFeedback } from 'react-native';
import LoginForm from './LoginForm';

const ACCESS_TOKEN = 'access_token';

export default class Login extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo}
              source={require('../../assets/logo-en.png')}/>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.formContainer}>
          <LoginForm navigator={this.props.navigator} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb600',
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
  formContainer: {
    paddingBottom: 20,
  }
});
