import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false,
    };

    this.goToLogin = this.goToLogin.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
  }

  goToLogin() {
    this.setState({login: true});
  }

  goToRegister() {
    this.setState({register: true});
  }

  render() {
    if (this.state.login) {
      return (<Redirect to="/welcome/login"/>);
    }
    if (this.state.register) {
      return (<Redirect to="/welcome/register"/>);
    }

    return (
    <div>
      <h3>{'Welcome'}</h3>
      <RaisedButton label="Login" onClick={this.goToLogin}/>
      <RaisedButton label="Register" onClick={this.goToRegister}/>
    </div>
    );
  }
}

export default Welcome;
