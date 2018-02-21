import React from 'react'; // eslint-disable-line no-unused-vars
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
// const NavBar = () => (<h1>{'Jobs!'}</h1>);

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CircularProgress from 'material-ui/CircularProgress';

const UserMenu = ({logout, myAccount}) => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton style={{display: 'inline'}}><MoreVertIcon/></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem onclick={myAccount} primaryText="My Account"/>
      <MenuItem onClick={logout} primaryText="Logout"/>
    </IconMenu>
  </div>
);

UserMenu.propTypes = {
  logout: PropTypes.func.isRequired,
};

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
    this.createEntry = this.createEntry.bind(this);
    this.logout = this.logout.bind(this);
  }

  myDashboard() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/dashboard'});
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
      return (<CircularProgress size={80} thickness={5}/>);
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
          docked={false}
          onRequestChange={this.setLeftMenuState}
          open={this.state.isLeftMenuOpen}
        >
          <MenuItem onClick={this.myDashboard}>{'Dashboard'}</MenuItem>
          <MenuItem onClick={this.myJobApps}>{'My Job Apps'}</MenuItem>
          <MenuItem onClick={this.createEntry}>{'New Entry'}</MenuItem>
          <MenuItem onClick={this.logout}>{'Logout'}</MenuItem>
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
