import React, { Component } from 'react';
import { StyleSheet, View, TextInput,
  TouchableOpacity, Text, TouchableWithoutFeedback,
  Keyboard } from 'react-native';

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

const Errors = (props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default class RegisterForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      password_confirmation: '',
      errors: [],
    }
  }

  async onRegisterPressed() {
    try {
      let response = await fetch('http://www.wordansdev.pt/api/v1/users.json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        })
      });

      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(errors) {
      let formErrors = JSON.parse(errors);
      let errorsArray = [];

      for(var key in formErrors) {
        if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${error}`));
        } else {
            errorsArray.push(`${formErrors[key]}`);
        }
      }
      this.setState({errors: errorsArray});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          onChangeText={(val) => this.setState({email: val})}
          returnKeyType='next'
          keyboardType='email-address'
          onSubmitEditing={() => this.firstnameInput.focus()}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder="email"
        />
        <TextInput style={styles.input}
          onChangeText={(val) => this.setState({firstname: val})}
          returnKeyType='next'
          onSubmitEditing={() => this.lastnameInput.focus()}
          autoCorrect={false}
          ref={(input) => this.firstnameInput = input}
          placeholder="first name"
        />
        <TextInput style={styles.input}
          onChangeText={(val) => this.setState({lastname: val})}
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          ref={(input) => this.lastnameInput = input}
          placeholder="last name"
        />
        <TextInput style={styles.input}
          onChangeText={(val) => this.setState({password: val})}
          secureTextEntry={true}
          returnKeyType='next'
          onSubmitEditing={() => this.passwordConfirmationInput.focus()}
          ref={(input) => this.passwordInput = input}
          placeholder="password"
        />
        <TextInput style={styles.input}
          onChangeText={(val) => this.setState({password_confirmation: val})}
          secureTextEntry={true}
          returnKeyType='go'
          ref={(input) => this.passwordConfirmationInput = input}
          placeholder="password confirmation"
        />
        <TouchableOpacity style={styles.buttonContainer}
          onPress={this.onRegisterPressed.bind(this)}>
          <Text style={styles.buttonText} >REGISTER</Text>
        </TouchableOpacity>
        <Errors errors={this.state.errors} />
      </View>
    )
  }
}
