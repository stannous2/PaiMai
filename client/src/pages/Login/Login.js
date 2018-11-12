import React, { Component, Link } from "react";
import styled from 'react-emotion';
import API from "../../utils/API";
import {MainForm, FormTitle, FormBody, FormTextInput, FormTextArea, SubmitButton } from "../../components/FormComponents/FormComponents";

const divStyle = {
  margin: 'auto'
}

class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            showSignInFields: true
      };
    }

handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({
        [name]: value
    })
}

// handleLogin = (event) => {
//   event.preventDefault();
//   if (this.state.email && this.state.password) {
//     API.login({
//       "email": this.state.email,
//       "password": this.state.password,
//     })
//       .then(console.log('logged in info:  ', JSON.stringify(this.state)))
//       .then(this.setState({
//           email: '',
//           password: '',
//           signedIn: true,
//           showSignInFields: false
//       }))
//       .catch(err => console.log(err));
//   }
// }
    render() {
      return (
        <div style={divStyle}>
          <MainForm>
            <FormTitle><h3>Sign In</h3></FormTitle>
            <FormBody>        
              <FormTextInput
                name="email"
                label="Email"
                type="text"
                onChangeFn={this.handleInputChange}
                value={this.state.email}
              />
              <FormTextInput
                name="password"
                label="Password"
                type="password"
                onChangeFn={this.handleInputChange}
                value={this.state.name}
              />  
              <SubmitButton onClick={this.handleMessageSubmit}>
                Submit
              </SubmitButton>
            </FormBody>
          </MainForm>
            
        </div>
        );
    }
}

export default Login;