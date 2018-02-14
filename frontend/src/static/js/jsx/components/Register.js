import React from 'react';
import ReactDOM from 'react-dom';
import {postRequest} from '../utils/jobsSDK';
import {Redirect} from 'react-router-dom';

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
        <form>
          <label>{'First Name'}</label>
          <input
            id="fname"
            onChange={this.onChange('fname')}
            type="text"
            value={this.state.fname}
          />
          <br/>
          <label>{'Last Name'}</label>
          <input
            id="lname"
            onChange={this.onChange('lname')}
            type="text"
            value={this.state.lname}
          />
          <br/>
          <label>{'Email'}</label>
          <input
            id="email"
            onChange={this.onChange('email')}
            type="text"
            value={this.state.email}
          />
          <br/>
          <label>{'Password'}</label>
          <input
            id="password"
            onChange={this.onChange('password')}
            type="text"
            value={this.state.password}
          />
          <button onClick={this.onSubmit}>{'Submit'}</button>
        </form>);
    }
    else {
      return <Redirect to="/app/"/>;
    }
  }
}

export default Register;
