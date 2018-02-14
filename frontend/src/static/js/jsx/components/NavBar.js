import React from 'react'; // eslint-disable-line no-unused-vars
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import UserStatus from './UserStatus';
// const NavBar = () => (<h1>{'Jobs!'}</h1>);

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      flashMessages: '',
      isLeftMenuOpen: false,
      redirect: undefined,
    };

    this.setLeftMenuState = this.setLeftMenuState.bind(this);
    this.toggleLeftMenu = this.toggleLeftMenu.bind(this);
    this.myJobApps = this.myJobApps.bind(this);
    this.createEntry = this.createEntry.bind(this);
    this.handleUserStatus = this.handleUserStatus.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  myJobApps() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/job_applications'});
  }

  createEntry() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/app_form'});
  }

  handleUserStatus() {
    if (!this.userStatus.state.loggedIn) {
      return (<Redirect to="/app/login"/>);
    }

    //this.setState({isLeftMenuOpen: false, redirect: '/app/login'});
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
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect}/>);
    }

    if (!this.userStatus.state.loggedIn) {
      return (<Redirect to="/app/login"/>);
    }



    return (
      <div className="navbar">
        <RaisedButton
          label="Menu"
          onClick={this.toggleLeftMenu}
        />
        <Drawer docked={false} open={this.state.isLeftMenuOpen} onRequestChange={this.setLeftMenuState}>
          <MenuItem onClick={this.myJobApps}>{'My Job Apps'}</MenuItem>
          <MenuItem onClick={this.createEntry}>{'New Entry'}</MenuItem>
          <UserStatus onClick={this.handleUserStatus} ref={(userStatus) => {this.userStatus = userStatus;}}
            {...props}/>
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
