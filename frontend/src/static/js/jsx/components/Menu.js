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
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import CircularProgress from 'material-ui/CircularProgress';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import CreateIcon from 'material-ui/svg-icons/content/create';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon/></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Profile"/>
    <MenuItem primaryText="Settings"/>
    <MenuItem primaryText="Sign out"/>
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      redirect: '',
      isLeftMenuOpen: false,
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
    this.myAnalytics = this.myAnalytics.bind(this);
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

  myAnalytics() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/analytics'});
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
      <div>

        <AppBar
          title="Jobs"
          iconElementLeft={<MenuIcon style={{padding: 16}} onClick={this.toggleLeftMenu}/>}
          iconElementRight={<Logged/>}
        />
      <div className="navbar">
        <Drawer
          docked={false}
          width={'15%'}
          onRequestChange={this.setLeftMenuState}
          open={this.state.isLeftMenuOpen}
        >
          <MenuItem onClick={this.myDashboard} leftIcon={<HomeIcon/>} primaryText={'Home'}/>
          <br/>
          <MenuItem onClick={this.myCompare} leftIcon={<AssessmentIcon/>} primaryText={'Compare'}/>
          <br/>
          <MenuItem onClick={this.createEntry} leftIcon={<CreateIcon/>} primaryText={'Create'}/>
          <br/>
          <MenuItem onClick={this.myAnalytics} leftIcon={<AssessmentIcon/>} primaryText={'Analytics'}/>
          <MenuItem onClick={this.logout}>{'Logout'}</MenuItem>
        </Drawer>
      </div>
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
