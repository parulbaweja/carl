import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {postRequest} from '../utils/jobsSDK';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CreateIcon from 'material-ui/svg-icons/content/create';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];

const appId = ({match}) => (
  match.params.app_id
);

const date = new Date();

class SingleAppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: undefined,
      company: '',
      position: '',
      contactName: '',
      contactEmail: '',
      statusId: 1,
      offerAmount: '',
      notes: '',
      url: '',
      date: undefined,
    };
  }

  componentDidMount() {
    var self = this;
    apiRequest('apps_repo', function(body) {
      self.setState(Object.assign({
        apps: body,
      }, body[self.props.appId]
      ));
      var date = new Date(self.state.date);
      date.setDate(date.getDate() + 1);
      self.setState({
        date: date,
      });
    });

  }

  render() {
    if (this.state.apps === undefined) {
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
                  {this.state.apps[this.props.appId].company}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Position'}
            </TableRowColumn>
            <TableRowColumn>
                  {this.state.apps[this.props.appId].position}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Name'}
            </TableRowColumn>
            <TableRowColumn>
                  {this.state.apps[this.props.appId].contactName}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Email'}
            </TableRowColumn>
            <TableRowColumn>
                  {this.state.apps[this.props.appId].contactEmail}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Status'}
            </TableRowColumn>
            <TableRowColumn>
                    {this.state.apps[this.props.appId].status}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Date'}
            </TableRowColumn>
            <TableRowColumn>
                    {this.state.apps[this.props.appId].date.slice(0, 16)}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Offer Amount'}
            </TableRowColumn>
            <TableRowColumn>
                    {this.state.apps[this.props.appId].offerAmount}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Notes'}
            </TableRowColumn>
            <TableRowColumn>
                    {this.state.apps[this.props.appId].notes}
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'URL'}
            </TableRowColumn>
            <TableRowColumn>
                    {this.state.apps[this.props.appId].url}
            </TableRowColumn>
          </TableRow>
      </TableBody>
    </Table>
      <RaisedButton label="Save" onClick={this.onSubmit}/>
      </div>
    );
  }
}

SingleAppView.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default SingleAppView;
