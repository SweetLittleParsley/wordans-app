import React, { Component } from 'react';
import { StyleSheet, View, Image,
  KeyboardAvoidingView, Keyboard,
  TouchableWithoutFeedback } from 'react-native';
import RegisterForm from './RegisterForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb600',
    paddingTop: 70
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  logo: {
    width: 300,
    height: 80,
  }
});

export default class Register extends React.Component {
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
          <RegisterForm />
        </View>
      </KeyboardAvoidingView>
    )
  }
}
