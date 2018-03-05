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

class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: undefined,
      isEditing: this.props.initialEditing,
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
    // this.editSection = this.editSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
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

  // editSection() {
  //   this.setState({
  //     isEditing: true,
  //   });
  // }

  onChange(key) {
    return (e) => {
      var newState = {};
      newState[key] = e.target.value;
      this.setState(newState);
    };
  }

  handleDateChange(e, date) {
    var newDate = new Date(date);
    this.setState({
      date: newDate,
    });
  }

  handleStatusChange(e, index, statusId) {
    this.setState({
      statusId,
    });
  }

  onSubmit() {
    var self = this;
    postRequest(`application/update/${self.props.appId}`, self.state, function(body) {
      var apps = [...self.state.apps];
      apps[self.props.appId] = body;
      self.setState({
        apps,
      });
      self.props.callback(false);
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
                  <TextField
                    id="company"
                    onChange={this.onChange('company')}
                    type="text"
                    value={this.state.company}
                  />
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Position'}
            </TableRowColumn>
            <TableRowColumn>
                  <TextField
                    id="position"
                    onChange={this.onChange('position')}
                    type="text"
                    value={this.state.position}
                  />
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Name'}
            </TableRowColumn>
            <TableRowColumn>
                  <TextField
                    id="contactName"
                    onChange={this.onChange('contactName')}
                    type="text"
                    value={this.state.contactName}
                  />
                </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Email'}
            </TableRowColumn>
            <TableRowColumn>
                  <TextField
                    id="contactEmail"
                    onChange={this.onChange('contactEmail')}
                    type="text"
                    value={this.state.contactEmail}
                  />
                </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Status'}
            </TableRowColumn>
            <TableRowColumn>
                <SelectField
                  floatingLabelText="Status"
                  onChange={this.handleStatusChange}
                  value={this.state.statusId}
                >
                  <MenuItem
                    primaryText="Interested"
                    value={1}
                  />
                  <MenuItem
                    primaryText="Applied"
                    value={2}
                  />
                  <MenuItem
                    primaryText="Phone Call"
                    value={3}
                  />
                  <MenuItem
                    primaryText="Interview"
                    value={4}
                  />
                  <MenuItem
                    primaryText="Offer"
                    value={5}
                  />
                  <MenuItem
                    primaryText="Accepted"
                    value={6}
                  />
                  <MenuItem
                    primaryText="Withdrawn"
                    value={7}
                  />
                  <MenuItem
                    primaryText="Not a Fit"
                    value={8}
                  />
                </SelectField>
              </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Date'}
            </TableRowColumn>
            <TableRowColumn>
                <DatePicker
                  onChange={this.handleDateChange}
                  floatingLabelText="Date"
                  value={this.state.date}
                />
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Offer Amount'}
            </TableRowColumn>
            <TableRowColumn>
                  <TextField
                    id="offerAmount"
                    onChange={this.onChange('offerAmount')}
                    type="text"
                    value={this.state.offerAmount}
                  />
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Notes'}
            </TableRowColumn>
            <TableRowColumn>
                  <TextField
                    id="notes"
                    multiLine={true}
                    onChange={this.onChange('notes')}
                    type="text"
                    value={this.state.notes}
                  />
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'URL'}
            </TableRowColumn>
            <TableRowColumn>
                  <TextField
                    id="notes"
                    onChange={this.onChange('url')}
                    type="text"
                    value={this.state.url}
                  />
            </TableRowColumn>
          </TableRow>
      </TableBody>
    </Table>
      <RaisedButton label="Save" onClick={this.onSubmit}/>
      </div>
    );
  }
}

EditView.propTypes = {
  appId: PropTypes.number.isRequired,
  initialEditing: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};

export default EditView;
