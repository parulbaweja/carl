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

const AppRouter = () => (
  <BrowserRouter>
    <div>

      <Route component={NavBar} exact={false} path="/app"/>
      <Route component={JobApplications} exact={true} path="/app/job_applications"/>
      <Route component={JobAppForm} exact={true} path="/app/app_form"/>
      <Route component={SingleAppView} exact={true} path="/app/apps/:app_id"/>
      <Route component={LoginForm} exact={true} path="/login"/>
      <Route component={Register} exact={true} path="/app/register"/>
      <Route component={AppBox} exact={true} path="/app/dashboard"/>
    </div>
  </BrowserRouter>
);

export default AppRouter;
