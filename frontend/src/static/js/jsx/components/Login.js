import React from 'react';
import {postRequest} from '../utils/jobsSDK';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {CircularProgress} from 'material-ui/Progress';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userID: '',
      error: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    const self = this;
    apiRequest('check_login', function(body) {
      self.setState({
        loggedIn: body.loggedIn,
      });
    });
  }

  onChange(key) {
    return (e) => {
      var newState = {...this.state};
      newState[key] = e.target.value;
      this.setState(newState);
    };
  }

  onSubmit(e) {
    e.preventDefault();
    var self = this;
    postRequest('login', self.state, function(body) {
      self.setState({
        userID: body.user_id,
        error: body.error,
      });
    });
  }

  render() {
    if (this.state.error) {
      return (<Redirect to="/welcome/"/>);
    }
    if (this.state.loggedIn === undefined) {
      return (<CircularProgress variant="determinate" size={50}/>);
    }

    if (this.state.loggedIn === true) {
      return (<Redirect to={'/app/dashboard/'}/>);
    }
    if (this.state.userID) {
      return (<Redirect to="/app/dashboard/"/>);
    }
    return (
      <div>
        <br/>
        <h3>{'Login'}</h3>
      <form>
        <TextField
          id="email"
          label="Email"
          onChange={this.onChange('email')}
          type="text"
          value={this.state.email}
        />
        <br/>
        <TextField
          id="password"
          label="Password"
          onChange={this.onChange('password')}
          type="password"
          value={this.state.password}
        />
        <br/>
        <Button onClick={this.onSubmit}>
          {'Submit'}
        </Button>
        </form>
      </div>);
  }
}

export default LoginForm;
