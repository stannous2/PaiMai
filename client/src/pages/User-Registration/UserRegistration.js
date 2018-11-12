import React, { Component } from "react";
import styled from 'react-emotion';
import { MainForm, FormTitle, FormBody, FormTextInput, FormTextArea, SubmitButton } from "../../components/FormComponents/FormComponents";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const HomePageDiv = styled('div')({
  display: "flex",
  justifyContent: "space-around",
  height: "100%",
  width: "100%",
  position: "absolute",
  top: 70,
  left: 0
})

const HomePageElements = styled('div')({
  backgroundColor: "rgba(255,255,255,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "75%",
  width: "85%",
  margin: 40,
  fontSize: 40
})

const LinkSpan = styled('span')({
  color: "blue"
})

const divStyle = {
  margin: 'auto'
}

const spanStyle = {
  color: 'rgba(0,0,0,0.6)',
  textAlign: 'center',
  display: 'block',
  fontSize: 14,
  paddingBottom: 10
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
class UserRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
        First: '',
        Last: '',
        email: '',
        password: '',
        showRegistrationForm: true,
        id: '',
        loggedIn: false
  };
    
  }
  componentDidMount = () => {
    console.log(getCookie("id"));
    if(getCookie("id")){
      this.setState({
        showRegistrationForm: false
      })
    }
  }
  
    render() {
      
      return (
          <div style={divStyle}>
          {
            !this.props.loggedIn ? 
            <MainForm>
              <FormTitle>
                <h3 style={divStyle}>Sell stuff for Free!</h3>
                <h4 style={divStyle}>Sign up Now</h4>
              </FormTitle>

              <FormBody>
                <FormTextInput
                  name="first"
                  label="First Name:"
                  type="text"
                  onChangeFn={this.props.handleInputChange}
                  value={this.props.first}
                />

                <FormTextInput
                    name="last"
                    label="Last Name:"
                    type="text"
                    onChangeFn={this.props.handleInputChange}
                    value={this.props.last}
                />
              
                <FormTextInput
                    name="email"
                    label="Email:"
                    type="string"
                    onChangeFn={this.props.handleInputChange}
                    value={this.props.email}
                />
                
                <FormTextInput
                    name="password"
                    label="Password:"
                    type="password"
                    onChangeFn={this.props.handleInputChange}
                    value={this.props.password}
                />
                <span className="agreement" style={spanStyle}>
                  By clicking Join now, you agree to the PaiMai User Agreement, Privacy Policy, and Cookie Policy.
                </span>
              
                <SubmitButton onClick={this.props.handleRegistrationSubmit}>
                  Join Now
                </SubmitButton>
              </FormBody>
            </MainForm>
            : <HomePageDiv>
                <HomePageElements>
                  <LinkSpan><Link to="/yardsalecreation">Create A Yard Sale</Link></LinkSpan>
                </HomePageElements>
                <HomePageElements>
                  <LinkSpan><Link to="/yardsalelistings">Browse Yard Sales By Zip Code</Link></LinkSpan>
                </HomePageElements>
              </HomePageDiv>
            }
            </div>
      );
  }
}


export default UserRegistration