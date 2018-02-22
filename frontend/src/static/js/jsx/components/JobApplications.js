import Table from './old/Table';
import React from 'react';
import apiRequest from '../utils/jobsSDK';

class JobApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    var self = this;
    apiRequest('applications', function(body) {
      self.setState(function() {
        return {
          rows: body.map(function(row) {
            return [
              row.company, row.position, row.contactName, row.contactEmail, row.status, row.offerAmount, row.notes, row.url];
          }),
        };
      });
    },
    function() {});
  }

  render() {
    var headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];
    return (<Table headers={headers} rows={this.state.rows}/>);
  }
}

export default JobApplications;
