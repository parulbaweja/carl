import React from 'react'; // eslint-disable-line no-unused-vars
import apiRequest from '../utils/jobsSDK';
// const NavBar = () => (<h1>{'Jobs!'}</h1>);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
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
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    //e.preventDefault();
    var self = this;
    apiRequest('logout', self.state, function(body) {
      self.setState({
        loggedIn: body.loggedIn,
      });
    });
  }

  render() {
    return (
        <div className="navbar">
          <h1>{'Jobs!'}</h1>
          { this.state.loggedIn ? <h2>{' You are logged in!'}</h2> : <h2>{ 'You are not logged in'}</h2> }
            <a href={'/app/job_applications'}>{'Job Applications'}</a>
            <a href={'/app/app_form'}>{'New Entry'}</a>
            { this.state.loggedIn ? <a onClick={this.onClick} href={'/login'}>{'Logout'}</a> : <a href={'/login'}>{'Login'}</a> }
          </div>
    );
  }
}

export default NavBar;
