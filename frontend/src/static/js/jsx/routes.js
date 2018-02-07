import React from 'react'; // eslint-disable-line no-unused-vars
import JobApplications from './components/JobApplications';
import NavBar from './components/NavBar';
import {BrowserRouter, Route} from 'react-router-dom';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Route component={NavBar} exact={false} path="/app"/>
      <Route component={JobApplications} exact={true} path="/app/job_applications"/>
    </div>
  </BrowserRouter>
);

export default AppRouter;
