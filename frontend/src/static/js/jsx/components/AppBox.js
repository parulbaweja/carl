//import Table from './Table';
import SingleAppView from './SingleAppView';
import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class AppBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };

    var self = this;
    apiRequest('applications', function(body) {
      console.log(body);
      self.setState({
        rows: body.map(function(row) {
          return [row.applicationID, row.company, row.status, row.lastDate];
        }),
      });
    });

  }

  render() {
    console.log(this.state);
    var headers = [
      <TableHeaderColumn key={0}>{'Companies'}</TableHeaderColumn>,
      <TableHeaderColumn key={1}>{'Status'}</TableHeaderColumn>, <TableHeaderColumn key={2}>{'Recent Activity'}</TableHeaderColumn>,
    ];
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {headers}
          </TableRow>
        </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              this.state.rows.map((company, i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn><Link to={`/app/apps/${company[0]}`}>{company[1]}</Link></TableRowColumn>
                    <TableRowColumn>{company[2]}</TableRowColumn>
                    <TableRowColumn>{company[3].slice(0, -13)}</TableRowColumn>
                  </TableRow>
                );
              })
            }
          </TableBody>

      </Table>
    );
  }
}

export default AppBox;
