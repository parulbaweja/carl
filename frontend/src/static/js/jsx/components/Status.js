import React from 'react';
import apiRequest from '../utils/jobsSDK';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    var self = this;
    apiRequest('/status', function(body) {
      self.setState(function() {
        return {
          rows: body.map(function(row) {
            return [row.status];
          }),
        };
      });
    });
  }

  render() {
    return (<option rows={this.state.rows}/>);
  }
}

export default Status;
