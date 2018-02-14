import React from 'react';
import {postRequest} from '../utils/jobsSDK';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userID: '',
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
      console.log(body);
      self.setState({
        userID: body.user_id,
      });
    });
  }

  render() {
    if (this.state.loggedIn === undefined) {
      return (<CircularProgress size={80} thickness={5}/>);
    }

    if (this.state.loggedIn === true) {
      return (<Redirect to={'/app'}/>);
    }
    if (this.state.userID) {
      return (<Redirect to="/app/"/>);
    }
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
