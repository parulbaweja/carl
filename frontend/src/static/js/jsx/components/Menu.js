import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import Drawer from 'material-ui/Drawer';
import {CircularProgress} from 'material-ui/Progress';
import DashboardIcon from 'material-ui-icons/Dashboard';
import AssessmentIcon from 'material-ui-icons/Assessment';
import ArchiveIcon from 'material-ui-icons/Archive';
import CompareArrowsIcon from 'material-ui-icons/CompareArrows';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: 200,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class Menu extends React.Component {
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
      return (<CircularProgress variant="determinate" size={50}/>);
    }

    if (this.state.loggedIn === false) {
      return (<Redirect to={'/welcome'}/>);
    }

    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect}/>);
    }

    const {classes} = this.props;

    return (
      <div className={classes.root}>

        <Drawer
          variant="permanent"
          classes={{paper: classes.drawerPaper}}
          style={{position: 'fixed'}}>
          <div className={classes.toolbar}/>
          <List>
            <ListItem button={true} onClick={this.myDashboard}>
              <ListItemIcon>
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button={true} onClick={this.myCompare}>
              <ListItemIcon>
                <CompareArrowsIcon/>
              </ListItemIcon>
              <ListItemText primary="Compare"/>
            </ListItem>
            <ListItem button={true} onClick={this.myArchive}>
              <ListItemIcon>
                <ArchiveIcon/>
              </ListItemIcon>
              <ListItemText primary="Archive"/>
            </ListItem>
            <ListItem button={true} onClick={this.myAnalytics}>
              <ListItemIcon>
                <AssessmentIcon/>
              </ListItemIcon>
              <ListItemText primary="Analytics"/>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.setState({redirect: undefined});
    }
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
