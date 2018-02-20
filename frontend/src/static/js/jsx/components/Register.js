import React from 'react';
import ReactDOM from 'react-dom';
import {postRequest} from '../utils/jobsSDK';
import {Redirect} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      userID: -1,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    postRequest('register', self.state, function(body) {
      self.setState ({
        userID: body.user_id,
      });
    });
  }

  render() {
    if (this.state.userID == -1) {
      return (
        <div>
        <h3>{'Register'}</h3>
        <form>
          <TextField
            hintText="First Name"
            id="fname"
            onChange={this.onChange('fname')}
            type="text"
            value={this.state.fname}
          />
          <br/>
          <TextField
            hintText="Last Name"
            id="lname"
            onChange={this.onChange('lname')}
            type="text"
            value={this.state.lname}
          />
          <br/>
          <TextField
            hintText="Email"
            id="email"
            onChange={this.onChange('email')}
            type="text"
            value={this.state.email}
          />
          <br/>
          <TextField
            hintText="Password"
            id="password"
            onChange={this.onChange('password')}
            type="password"
            value={this.state.password}
          />
          <br/>
            <FlatButton label="Submit" onClick={this.onSubmit}/>
          </form>
        </div>
      );
    }
    else {
      return <Redirect to="/app/"/>;
    }
  }
}

export default Register;
