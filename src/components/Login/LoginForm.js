import React, { Component } from 'react';
import { StyleSheet, View, TextInput,
  TouchableOpacity, Text, TouchableWithoutFeedback,
  Keyboard, AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: '#da9c03'
  },
  buttonText: {
    textAlign: 'center',
  },
  error: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10
  }
});

const ACCESS_TOKEN = 'access_token';

const Errors = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: [],
    }
  }

  async storeToken(accessToken) {
    try {
      AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      console.log("Token was stored successfull ");
    } catch(error) {
      console.log("Something went wrong");
    }
  }

  async onLoginPressed() {
    try {
      let response = await fetch('http://www.wordansdev.pt/api/v1/users/login.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: {
            email: this.state.email,
            password: this.state.password
          }
        })
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          this.storeToken(accessToken);
          this.setState({errors: []});
          this.props.navigator.navigate('Home');
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
      this.setState({errors: [error]});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={(val) => this.setState({email: val})}
          returnKeyType='next'
          keyboardType='email-address'
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="email"
        />
        <TextInput style={styles.input}
          onChangeText={(val) => this.setState({password: val})}
          secureTextEntry={true}
          returnKeyType='go'
          ref={(input) => this.passwordInput = input}
          placeholder="password"
        />
        <TouchableOpacity style={styles.buttonContainer}
          onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText} >LOGIN</Text>
        </TouchableOpacity>
        <Errors errors={this.state.errors} />
      </View>
    )
  }
}
