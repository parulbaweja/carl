import React from 'react';
import {postRequest} from '../utils/jobsSDK';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  onSubmit() {
    postRequest('/login', this.state, function() { });
  }

  render() {
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
}

export default LoginForm;
