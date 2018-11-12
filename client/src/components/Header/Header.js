import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import "./Header.css";
import LoginFormItem from '../../components/LoginForm'


const HeaderWrapper = styled('header')({
  width: '100%',
  height: '50px',
  backgroundColor: '#283e4a',
  boxShadow: '0 2px 2px 2px rgba(0,0,0,.3)',
  textAlign: "center",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '0 6px',
  color: 'white'
});

const FormWrapper = styled('form')({
  className: "login-form",
  flexWrap: 'wrap',
  display: 'flex'
})

const LoginButton = styled('button')({
  background: "#283e4a",
  color: 'white',
  height: 30,
  width: 90,
  padding: '0 0 0 0'
})
const LogOutButton = styled('button')({
  background: "#283e4a",
  color: 'white',
  height: 30,
  width: 90,
  padding: '0 0 0 0'
})
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

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showLoginForm: false,
    };
  }
  

  render() {
    return (
      <HeaderWrapper>
        <h1>Pai Mai</h1>        
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/yardsalelistings">Yard Sales</Link>
          <Link to="/yardsalecreation">Sell Your Stuff</Link>
          
            {
              this.props.showLoginForm ?
              
                <FormWrapper>
                  <LoginFormItem
                    name="loginEmail"
                    value={this.state.loginEmail}
                    type="text"
                    placeHolder="Email"
                    onChangeFn={this.props.handleInputChange}
                  />
                  
                  <LoginFormItem
                    name="loginPassword"
                    value={this.state.loginPassword}
                    type="password"
                    placeHolder="Password"
                    onChangeFn={this.props.handleInputChange}
                  />
                  <div>
                    <LoginButton onClick={this.props.handleFormLogin}>Sign In</LoginButton>
                  </div>
                </FormWrapper>
              :<div> <h7 style={{ paddingTop: '10px', paddingRight: '10px'}}>{`Hello, ${this.props.first.toUpperCase()}`}</h7>   <LogOutButton onClick={this.props.handleFormLogout}>Log out</LogOutButton></div>
          }
      </HeaderWrapper>
    )
  }
}
export default Header;

