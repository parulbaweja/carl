import React from 'react';
import {Redirect} from 'react-router';
import Button from 'material-ui/Button';
import ReactPlayer from 'react-player';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false,
    };

    this.goToLogin = this.goToLogin.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
  }

  goToLogin() {
    this.setState({login: true});
  }

  goToRegister() {
    this.setState({register: true});
  }

  render() {
    if (this.state.login) {
      return (<Redirect to="/welcome/login"/>);
    }
    if (this.state.register) {
      return (<Redirect to="/welcome/register"/>);
    }

    return (
      <div style={{margin: 0, padding: 'none'}}>
        <video
          id="background-video" loop={true} autoPlay={true} height={800} width={1440}
          style={{padding: 'none', position: 'fixed', height: '100%', width: '100%', float: 'left'}}
        >
                <source src={'https://storage.googleapis.com/coverr-main/mp4/Black_Keys.mp4'} type="video/mp4"/>
                <h3>{'Testing'}</h3>
            </video>
      <h3>{'Welcome'}</h3>
      <Button onClick={this.goToLogin}>
        {'Login'}
      </Button>
      <Button onClick={this.goToRegister}>
        {'Register'}
      </Button>
    </div>
    );
  }
}

export default Welcome;
