import React from 'react';
import ReactDOM from 'react-dom';
import {postRequest} from '../utils/jobsSDK';
import {Redirect} from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    postRequest('login', self.state, function(body) {
      self.setState({
        userID: body.user_id,
      });
    });
  }

  render() {
    if (this.state.userID == -1) {
      return (
            <form>
                <label>{'Email:'}</label>
                <input
                  id="email"
                  onChange={this.onChange('email')}
                  type="text"
                  value={this.state.email}
              />
              <br/>
                <label>{'Password:'}</label>
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
      return <Redirect to="/app/job_applications"/>;
      console.log(this.state);
    }
  }
}

export default LoginForm;
