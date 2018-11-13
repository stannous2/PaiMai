import React, { Component } from "react";
import styled from 'react-emotion'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import YardSaleListings from "./pages/Yard-Sale-Listings/YardSaleListings"
import Header from './components/Header'
// import Contact from './pages/Contact/Contact'
import BodyMain from "./components/Body-main/BodyMain";
import Products from "./pages/Products"
// import UserRegistration from "./pages/User-Registration/UserRegistration"
import YardSaleCreation from "./pages/Yard-Sale-Creation/YardSaleCreation"
import API from './utils/API'
import axios from "axios";

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

const Content = styled('div')({
  textAlign: 'center'
})

class App extends Component {
  state = {
    loggedIn: false,
    type: '',
    id: "",
    showLoginForm: true,
    showRegistrationForm: true,
    first: '',
    showContactForm: true
  }

  getUserFirstName(id) {   
    return API.getUser(id).then(res => this.setState ({
      first: res.data.First}))
    }

  componentDidMount = () => {
    console.log("foo: ", this.state.showContactForm);
    

    if(getCookie("id") !== "" && getCookie("id") !== "0"){
      this.getUserFirstName(getCookie("id"))
      this.setState({
        id: getCookie("id"),
        loggedIn: true,
        showLoginForm: false
      })
    }

  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({
    [name]: value
    })
  }

  handleFormLogout = event => {
    event.preventDefault();
    document.cookie = "id=0";
    this.setState({
      first: '',
      last: '',
      showLoginForm: true,
      loggedIn: false,
      id: ""
    })
  }

  handleFormLogin = event => {
    event.preventDefault();
    if (this.state.loginEmail && this.state.loginPassword) {
      API.login({
      "email": this.state.loginEmail,
      "password": this.state.loginPassword,
    })
      .then((data) => {
        document.cookie = `id=${data.data.user._id}`        
        this.setState({
          first: data.data.user.First,
          email: "",
          password: "",
          showLoginForm: false,
          id: data.data.user._id,
          loggedIn: true,
          showRegistrationForm: false
        }, function() {
          })
      })
      .catch(err => console.log('fail to log in: ', err));
  }
  };

  handleRegistrationSubmit = event => {
    event.preventDefault();
    console.log("foo");
    if (this.state.first && this.state.last && this.state.email && this.state.password) {
      let newUser = {
        "First": this.state.first,
        "Last": this.state.last,
        "email": this.state.email,
        "password": this.state.password,
      };
      axios.post("/auth/signup", newUser)
      .then(response => {
        var userId = response.data._id
        this.setState({ id: userId }, function (){
          this.state.id ? 
            API.login({
              'email': this.state.email,
              'password': this.state.password
            })
            : console.log('userId is empty')
          
            this.setState({
              email: '',
              password: '',
              showRegistrationForm: false,
              showLoginForm: false,
              loggedIn: true
            }, function(){
                console.log('setData: ', this.state)
              })
            })
          })
          .catch(err => console.log(err));
    }
  };

  componentDidUpdate = () => {
    console.log(this.state);
    
  }

  render() {
    return (

      <Router>
        <div>
          <Header id={this.state.id} handleFormLogin={this.handleFormLogin} handleFormLogout={this.handleFormLogout} handleInputChange={this.handleInputChange} showLoginForm={this.state.showLoginForm} first={this.state.first} handleContactLink={this.handleContactLink} showContactForm={this.state.showContactForm} />
          <Content>
            <Switch>
              <Route exact path="/" render={() => <BodyMain id={this.state.id} handleRegistrationSubmit={this.handleRegistrationSubmit} handleInputChange={this.handleInputChange} loggedIn={this.state.loggedIn} last={this.state.last} first={this.state.first} email={this.state.email} password={this.state.password} />} />
              
              <Route path="/header" render={() => <Header showLoginForm={this.state.showLoginForm} /> } />
              
              <Route path="/contact" render={() => <BodyMain handleInputChange={this.handleInputChange} message={this.state.message} email={this.state.email} password={this.state.password} showContactForm={this.state.showContactForm} /> } />

              <Route exact path="/yardsalelistings" component={YardSaleListings} />
              <Route path="/products/*" component={Products} />
              <Route path="/yardsalecreation" render={() => <YardSaleCreation id={this.state.id} />}/>
            </Switch>
          </Content>
        </div>
      </Router>     

    );
  }
}

export default App;
