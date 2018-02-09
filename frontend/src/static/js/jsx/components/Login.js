import React from 'react';
import {postRequest} from '../utils/jobsSDK';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
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
                <label>{'Username:'}</label>
                <input
                  id="userId"
                  onChange={this.onChange('userId')}
                  type="text"
                  value={this.state.userId}
                />
                <label>{'Password:'}</label>
                <input
                  id="password"
                  onChange={this.onChange('password')}
                  type="text"
                  value={this.state.password}
                />
            </form>);
  }
}

export default LoginForm;
