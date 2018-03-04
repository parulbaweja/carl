import React from 'react';
import {Redirect} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

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
