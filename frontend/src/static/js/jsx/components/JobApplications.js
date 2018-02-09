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
          rows: body.map(function(row) {
            return [
              <a href={'/app/single_app'}>{'Application'}</a>, row.company, row.position, row.contactName, row.contactEmail, row.status, row.offerAmount, row.notes, row.url];
          }),
        };
      });
    });
  }

  render() {
    var headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];
    return (<Table headers={headers} rows={this.state.rows}/>);
  }
}

export default JobApplications;