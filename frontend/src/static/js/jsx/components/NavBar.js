import React from 'react'; // eslint-disable-line no-unused-vars
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
// const NavBar = () => (<h1>{'Jobs!'}</h1>);

import Drawer from 'material-ui/Drawer';
import Menu, {MenuItem} from 'material-ui/Menu';
import {CircularProgress} from 'material-ui/Progress';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      isLeftMenuOpen: false,
      redirect: '',
    };

    const self = this;
    apiRequest('check_login', function(body) {
      console.log(body);
      self.setState({
        loggedIn: body.loggedIn,
      });
    });

    this.setLeftMenuState = this.setLeftMenuState.bind(this);
    this.toggleLeftMenu = this.toggleLeftMenu.bind(this);
    this.myJobApps = this.myJobApps.bind(this);
    this.myDashboard = this.myDashboard.bind(this);
    this.myCompare = this.myCompare.bind(this);
    this.createEntry = this.createEntry.bind(this);
    this.logout = this.logout.bind(this);
  }

  myDashboard() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/dashboard'});
  }

  myCompare() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/compare'});
  }

  myJobApps() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/job_applications'});
  }

  createEntry() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/app_form'});
  }

  logout(e) {
    e.preventDefault();
    var self = this;
    apiRequest('logout', function(body) {
      console.log(body);
      self.setState({
        loggedIn: false,
      });
    });
  }

  setLeftMenuState(open) {
    this.setState({
      isLeftMenuOpen: open,
    });
  }

  toggleLeftMenu() {
    const isLeftMenuOpen = this.state.isLeftMenuOpen;
    this.setLeftMenuState(!isLeftMenuOpen);
  }

  render() {
    console.log(this.state);
    if (this.state.loggedIn === undefined) {
      return (<CircularProgress variant="determinate" size={50}/>);
    }

    if (this.state.loggedIn === false) {
      return (<Redirect to={'/welcome'}/>);
    }

    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect}/>);
    }

    return (
      <div className="navbar">
        <RaisedButton
          label="Menu"
          onClick={this.toggleLeftMenu}
        />
        <Drawer
          docked={true}
          onRequestChange={this.setLeftMenuState}
          open={this.state.isLeftMenuOpen}
        >
          <Menu>
          <MenuItem onClick={this.myDashboard}>{'Dashboard'}</MenuItem>
          <MenuItem onClick={this.myCompare}>{'Compare'}</MenuItem>
          <MenuItem onClick={this.myJobApps}>{'My Job Apps'}</MenuItem>
          <MenuItem onClick={this.createEntry}>{'New Entry'}</MenuItem>
          <MenuItem onClick={this.logout}>{'Logout'}</MenuItem>
        </Menu>
        </Drawer>
      </div>
      // <h1>{'Jobs!'}</h1>
      //     <h2>{'Welcome'} {this.state.fname}</h2>
      //      <a href={'/app/job_applications'}>{'Job Applications'}</a>
      //     <a href={'/app/app_form'}>{'New Entry'}</a>
      //     { this.state.loggedIn ? <a onClick={this.onClick} href={'/app/login'}>{'Logout'}</a> : <a href={'/app/login'}>{'Login'}</a> }
      //   </div>
    );
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({redirect: undefined});
    }
  }
}

export default NavBar;
