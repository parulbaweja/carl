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
import PropTypes from 'prop-types';

const headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];

// const appId = ({match}) => (
//   match.params.app_id
// );

class SingleAppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: undefined,
      // company: '',
      // position: '',
      // contactName: '',
      // contactEmail: '',
      // status: '',
      // offerAmount: '',
      // notes: '',
      // url: '',
      // edit: false,
    };

    this.editApp = this.editApp.bind(this);

  }

  componentDidMount() {
    console.log('component mounted');
    var self = this;
    apiRequest('apps_repo', function(body) {
      console.log(body);
      self.setState({
        apps: body,
          // company: body.company,
          // position: body.position,
          // contactName: body.contactName,
          // contactEmail: body.contactEmail,
          // status: body.status,
          // offerAmount: body.offerAmount,
          // notes: body.notes,
          // url: body.url,
      });
    });
  }

  editApp(e) {
    e.preventDefault();
    this.setState({
      edit: true,
    });
  }

  render() {
    console.log(this.props.appid);
    console.log(this.state);
    if (this.state.edit) {
      return (<Redirect to={`/app/edit/${this.props.appid}`}/>);
    }

    if (this.props.appid === undefined || this.state.apps === undefined) {
      return null;
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
              {this.state.apps[this.props.appid].company}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].position}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].contactName}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].contactEmail}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].status}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].offerAmount}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].notes}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].url}
            </TableRowColumn>
          </TableRow>
      </TableBody>
    </Table>
      <RaisedButton label="Edit" onClick={this.editApp}/>
      </div>
    );
  }
}

SingleAppView.propTypes = {
  appid: PropTypes.number.isRequired,
};

export default SingleAppView;
