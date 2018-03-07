import React from 'react'; // eslint-disable-line no-unused-vars
import JobAppForm from './components/JobAppForm';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginForm from './components/Login';
import Register from './components/Register';
import AppBox from './components/AppBox';
import Welcome from './components/Welcome';
import Compare from './components/Compare';
import Analytics from './components/Analytics';
import Menu from './components/Menu';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import NavBar from './components/NavBar';

const AppRouter = () => (
  <BrowserRouter>
    <div style={{height:'100%',width:'100%'}}>
      <Route component={Welcome} exact={false} path="/welcome"/>
      <Grid container={true} spacing={0} direction='column' justify='flex-start' alignItems='flex-start'>

        <Grid item={true} md={12}>
          <Route component={NavBar} exact={false} path="/app/"/>
    </Grid>

      <Grid container={true} spacing={0} direction='row' alignItems='flex-start' justify='flex-start' wrap={'wrap'}>
        <Grid item={true} md={true} style={{flexGrow: 0}}>
          <Route component={Menu} exact={false} path="/app"/>
        </Grid>

        <Grid item={true} md={9} style={{marginTop: '+100px', marginLeft: '15%'}}>
          <Route component={AppBox} exact={false} path="/app/dashboard/"/>
          <Route component={Compare} exact={true} path="/app/compare"/>
          <Route component={Analytics} exact={true} path="/app/analytics"/>
        </Grid>
    </Grid>
  </Grid>
          <Route component={JobAppForm} exact={true} path="/app/app_form"/>
          <Route component={LoginForm} exact={true} path="/welcome/login"/>
          <Route component={Register} exact={true} path="/welcome/register"/>
    </div>
  </BrowserRouter>
);

export default AppRouter;
