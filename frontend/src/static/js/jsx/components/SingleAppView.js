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

const appId = ({match}) => (
  match.params.app_id
);

class SingleAppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: undefined,
    };
    this.editApp = this.editApp.bind(this);
  }

  componentDidMount() {
    var self = this;
    apiRequest('apps_repo', function(body) {
      console.log(body);
      self.setState({
        apps: body,
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
        <TableBody
          displayRowCheckbox={false}
        >
          <TableRow>
            <TableRowColumn>
              {'Company'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].company}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Position'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].position}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Name'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].contactName}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Email'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].contactEmail}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Status'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].status}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Offer Amount'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].offerAmount}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Notes'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].notes}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'URL'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.apps[this.props.appid].url}
            </TableRowColumn>
          </TableRow>
      </TableBody>
    </Table>
      <RaisedButton label="Save" onClick={this.editApp}/>
      </div>
    );
  }
}

SingleAppView.propTypes = {
  appid: PropTypes.number.isRequired,
};

export default SingleAppView;
