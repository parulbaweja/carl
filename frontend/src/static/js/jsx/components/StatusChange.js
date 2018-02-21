import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const headers = ['Status', 'Date'];

const appId = ({match}) => (
  match.params.app_id
);

class StatusChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };

    var self = this;
    apiRequest(`timeline/${appId(this.props)}`, function(body) {
      console.log(body);
      self.setState(function() {
        return {
          rows: body.map(function(row, i) {
            return [
            ];
          }),
        };
      });
    });
  }

  render() {

    <div>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {headers.map((header, i) => {
              return (
        <TableHeaderColumn key={i}>{header}</TableHeaderColumn>
              );
            })
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
            {this.state.rows.map((data, i) => {
              return (
          <TableRow>
            <TableRowColumn>{this.state.rows[i].status}</TableRowColumn>
            <TableRowColumn>{this.state.rows[i].date}</TableRowColumn>
          </TableRow>
              );
            })
            }
      </TableBody>
    </Table>
  </div>;
  }
}

export default StatusChange;
