import React from 'react'; // eslint-disable-line no-unused-vars
import JobApplications from './components/JobApplications';
import JobAppForm from './components/JobAppForm';
import SingleAppView from './components/SingleAppView';
import NavBar from './components/NavBar';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginForm from './components/Login';
import Register from './components/Register';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Route component={NavBar} exact={false} path="/app"/>
      <Route component={JobApplications} exact={true} path="/app/job_applications"/>
      <Route component={JobAppForm} exact={true} path="/app/app_form"/>
      <Route component={SingleAppView} exact={true} path="/app/single_app"/>
      <Route component={LoginForm} exact={true} path="/app/login"/>
      <Route component={Register} exact={true} path="/app/register"/>
    </div>
  </BrowserRouter>
);

export default AppRouter;
