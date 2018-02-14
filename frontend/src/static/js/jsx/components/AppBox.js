//import Table from './Table';
import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
          return row.company;
        }),
      });
    });
  }

  render() {
    console.log(this.state);
    var headers = [<TableHeaderColumn key={0}>{'Companies'}</TableHeaderColumn>];
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
                  <TableRowColumn>{company}</TableRowColumn>
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
