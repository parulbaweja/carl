import Table from './Table';
import React from 'react';
import apiRequest from '../utils/jobsSDK';

class JobApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    var self = this;
    apiRequest('application/1', function(body) {
      self.setState(function() {
        return {
          rows: body.data.map(function(row) {
            return [row.company, row.status, row.date];
          }),
        };
      });
    });
  }

  render() {
    var headers = ['Company', 'Status', 'Date'];
    return (<Table headers={headers} rows={this.state.rows}/>);
  }
}

export default JobApplications;
