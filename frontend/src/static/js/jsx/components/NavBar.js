import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    const self = this;
    apiRequest('check_login', function(body) {
      self.setState({
        loggedIn: body.loggedIn,
      });
    });

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    var self = this;
    apiRequest('logout', function(body) {
      self.setState({
        loggedIn: false,
        redirect: '/welcome',
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect}/>);
    }
    return (
      <div style={{flexGrow: 1}}>
        <AppBar position="absolute">
          <Toolbar>
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            Jobs
          </Typography>
        <Button
          color="inherit"
          onClick={this.logout}
        >
          {'Logout'}</Button>
        </Toolbar>
      </AppBar>
      <img src='/background_img' style={{position: 'fixed', width: '100%', zIndex: -1}}/>
    </div>
    );
  }
}

export default NavBar;
