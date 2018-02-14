import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import MenuItem from 'material-ui/MenuItem';

class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };

    var self = this;

    apiRequest('check_login', function(body) {
      self.setState({
        fname: body.firstName,
        loggedIn: true,
      });
    }, function() {
      self.setState({
        loggedIn: false,
      });
    });

    this.handleUserStatus = this.handleUserStatus.bind(this);
  }

  handleUserStatus(e) {
    e.preventDefault();
    var self = this;
    apiRequest('logout', self.state, function(body) {
      self.setState({
        loggedIn: body.loggedIn,
      });
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <MenuItem onClick={this.handleUserStatus}>{'Logout'}</MenuItem>
        </div>
      );
    }
    else {
      return (
      <div>
        <MenuItem>{'Login'}</MenuItem>
      </div>
      );
    }
  }
}

export default UserStatus;
