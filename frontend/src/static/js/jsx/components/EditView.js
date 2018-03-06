import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {postRequest} from '../utils/jobsSDK';
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';

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
        <TableBody>
          <TableRow>
            <TableCell>
              {'Company'}
            </TableCell>
            <TableCell>
                  <TextField
                    id="company"
                    onChange={this.onChange('company')}
                    type="text"
                    value={this.state.company}
                  />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Position'}
            </TableCell>
            <TableCell>
                  <TextField
                    id="position"
                    onChange={this.onChange('position')}
                    type="text"
                    value={this.state.position}
                  />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Contact Name'}
            </TableCell>
            <TableCell>
                  <TextField
                    id="contactName"
                    onChange={this.onChange('contactName')}
                    type="text"
                    value={this.state.contactName}
                  />
                </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Contact Email'}
            </TableCell>
            <TableCell>
                  <TextField
                    id="contactEmail"
                    onChange={this.onChange('contactEmail')}
                    type="text"
                    value={this.state.contactEmail}
                  />
                </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Status'}
            </TableCell>
            <TableCell>
                <Select
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
                </Select>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              {'Date'}
            </TableCell>
            <TableCell>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={this.state.date}
                InputLabelProps={{
                  shrink: true,
                }}
      />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Offer Amount'}
            </TableCell>
            <TableCell>
                  <TextField
                    id="offerAmount"
                    onChange={this.onChange('offerAmount')}
                    type="text"
                    value={this.state.offerAmount}
                  />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Notes'}
            </TableCell>
            <TableCell>
                  <TextField
                    id="notes"
                    multiline={true}
                    onChange={this.onChange('notes')}
                    type="text"
                    value={this.state.notes}
                  />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'URL'}
            </TableCell>
            <TableCell>
                  <TextField
                    id="notes"
                    onChange={this.onChange('url')}
                    type="text"
                    value={this.state.url}
                  />
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
    <Button onClick={this.onSubmit}>
      {'Save'}
    </Button>
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
