import React from 'react';
import {Redirect} from 'react-router';
import Button from 'material-ui/Button';
import ReactPlayer from 'react-player';
import Login from './Login';
import Register from './Register';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
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

    return (
      <div>
        <div style={{position: 'fixed'}}>
        <video
          id="background-video" loop={true} autoPlay={true} width={'100%'}
          style={{padding: 'none', position: 'fixed', width: '100%', float: 'left'}}
        >
          <source src={'https://storage.googleapis.com/coverr-main/mp4/Black_Keys.mp4'} type="video/mp4"/>
        </video>
        </div>

            <Paper style={{width: 300, height: 50, zIndex: '1', position: 'fixed', marginLeft: '37%', marginTop: '10%', backgroundColor: 'rgba(255, 255, 255, 0.7', textAlign: 'center'}}>
              <Typography variant='display1'>{'carl'}</Typography>
          </Paper>
            <Paper style={{width: 300, height: 250, zIndex: '1', position: 'fixed', marginLeft: '37%', marginTop: '15%', backgroundColor: 'rgba(255, 255, 255, 0.7', textAlign: 'center'}}>
            {this.state.login &&
                <div>
                  <Login/>
              <Button onClick={this.goToRegister}>
                {'Register'}
              </Button>
            </div>
            }
            {this.state.register &&
                <div>
                <Register/>
              <Button onClick={this.goToLogin}>
                {'Login'}
              </Button>
            </div>
            }
          </Paper>
    </div>
    );
  }
}

export default Welcome;
