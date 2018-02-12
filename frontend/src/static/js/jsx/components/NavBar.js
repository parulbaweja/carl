import React from 'react'; // eslint-disable-line no-unused-vars
import apiRequest from '../utils/jobsSDK';
// const NavBar = () => (<h1>{'Jobs!'}</h1>);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
    };
    var self = this;
    apiRequest('check_login', function(body) {
      self.setState({
        fname: body.firstName,
      });
    }, function() {
      self.setState({
        loggedOut: true,
      });
    });
  }

  render() {
    return (
        <div className="navbar">
            <h1>{'Jobs!'}</h1>
            <a href={'/app/job_applications'}>{'Job Applications'}</a>
            <a href={'/app/app_form'}>{'New Entry'}</a>
        </div>
    );
  }
}

export default NavBar;
