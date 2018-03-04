import React from 'react'; // eslint-disable-line no-unused-vars
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import AppBar from 'material-ui/AppBar';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import CompareArrowsIcon from 'material-ui/svg-icons/action/compare-arrows';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><KeyboardArrowDown/></IconButton>
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
      self.setState({
        loggedIn: body.loggedIn,
      });
    });

    this.setLeftMenuState = this.setLeftMenuState.bind(this);
    this.toggleLeftMenu = this.toggleLeftMenu.bind(this);
    this.myAnalytics = this.myAnalytics.bind(this);
    this.myDashboard = this.myDashboard.bind(this);
    this.myCompare = this.myCompare.bind(this);
    this.myArchive = this.myArchive.bind(this);
    this.logout = this.logout.bind(this);
  }

  myDashboard() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/dashboard/'});
  }

  myCompare() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/compare'});
  }

  myArchive() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/dashboard/archive'});
  }

  myAnalytics() {
    this.setState({isLeftMenuOpen: false, redirect: '/app/analytics'});
  }

  logout(e) {
    e.preventDefault();
    var self = this;
    apiRequest('logout', function(body) {
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
          iconElementLeft={<MenuIcon style={{padding: 16}} onClick={this.toggleLeftMenu}/>}
          iconElementRight={<Logged/>}
          title="Joblands"
        />
      <div className="navbar">
        <Drawer
          containerStyle={{height: 'calc(100% - 64px)', top: 80}}
          docked={false}
          onRequestChange={this.setLeftMenuState}
          open={this.state.isLeftMenuOpen}
          width={'15%'}
        >
          <MenuItem
            leftIcon={<HomeIcon/>}
            onClick={this.myDashboard}
            primaryText={'Home'}/>
          <br/>
          <MenuItem
            leftIcon={<CompareArrowsIcon/>}
            onClick={this.myCompare}
            primaryText={'Compare'}
          />
          <br/>
          <MenuItem
            leftIcon={<ArchiveIcon/>}
            onClick={this.myArchive}
            primaryText={'Archive'}
          />
          <MenuItem
            leftIcon={<AssessmentIcon/>}
            onClick={this.myAnalytics}
            primaryText={'Analytics'}
          />
          <MenuItem onClick={this.logout}>{'Logout'}</MenuItem>
        </Drawer>
      </div>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({redirect: undefined});
    }
  }
}

export default NavBar;
