import React from 'react'; // eslint-disable-line no-unused-vars
import JobApplications from './components/JobApplications';
import JobAppForm from './components/JobAppForm';
import SingleAppView from './components/SingleAppView';
import NavBar from './components/NavBar';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginForm from './components/Login';
import Register from './components/Register';
import AppBox from './components/AppBox';
import EditView from './components/EditView';
import Welcome from './components/Welcome';
import StatusChange from './components/StatusChange';
import Container from './components/dnd/Container';
import AppDrawer from './components/AppDrawer';
import Compare from './components/Compare';
import Analytics from './components/Analytics';
import Menu from './components/Menu';

const AppRouter = () => (
  <BrowserRouter>
    <div>

      <Route component={Welcome} exact={false} path="/welcome"/>
      <Route component={Menu} exact={false} path="/app"/>
      <Route component={JobAppForm} exact={true} path="/app/app_form"/>
      <Route component={LoginForm} exact={true} path="/welcome/login"/>
      <Route component={Register} exact={true} path="/welcome/register"/>
      <Route component={AppBox} exact={false} path="/app/dashboard/"/>
      <Route component={Compare} exact={true} path="/app/compare"/>
      <Route component={Analytics} exact={true} path="/app/analytics"/>
    </div>
  </BrowserRouter>
);

export default AppRouter;
