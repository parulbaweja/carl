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
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect, Link} from 'react-router';
import EditView from './EditView';

const headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];

const appId = ({match}) => (
  match.params.app_id
);

class SingleAppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      position: '',
      contactName: '',
      contactEmail: '',
      status: '',
      offerAmount: '',
      notes: '',
      url: '',
      edit: false,
    };

    this.editApp = this.editApp.bind(this);

    var self = this;
    apiRequest(`user/app/${appId(this.props)}`, function(body) {
      // console.log(body);
      self.setState({
        company: body.company,
        position: body.position,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
        status: body.status,
        offerAmount: body.offerAmount,
        notes: body.notes,
        url: body.url,
      }
        );
    });
  }

  editApp(e) {
    e.preventDefault();
    this.setState({
      edit: true,
    });
  }

  render() {
    console.log(this.state);
    if (this.state.edit) {
      return (<EditView appId={appId(this.props)}/>);
    }
    return (
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
          <TableRow>
            <TableRowColumn>
              {this.state.company}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.position}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.contactName}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.contactEmail}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.status}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.offerAmount}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.notes}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.url}
            </TableRowColumn>
          </TableRow>
      </TableBody>
    </Table>
      <RaisedButton label="Edit" onClick={this.editApp}/>
      </div>
    );
  }
}

export default SingleAppView;
