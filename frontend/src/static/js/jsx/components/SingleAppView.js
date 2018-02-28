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
import Snackbar from 'material-ui/Snackbar';

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
      isEditing: false,
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
    this.editSection = this.editSection.bind(this);
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
      }, body[self.props.appid]
      ));
      var date = new Date(self.state.date);
      date.setDate(date.getDate() + 1);
      self.setState({
        date: date,
      });
    });

  }

  editSection() {
    this.setState({
      isEditing: true,
    });
  }

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
    postRequest(`application/update/${self.props.appid}`, self.state, function(body) {
      var apps = [...self.state.apps];
      apps[self.props.appid] = body;
      self.setState({
        isEditing: false,
        apps,
      });
    });
  }

  render() {
    console.log(this.state);
    if (this.state.apps === undefined) {
      return null;
    }

    return (
      <div>
        <IconButton onClick={this.editSection} style={{top:0, right:0}}>
          <CreateIcon style={{top:0, right:0}}/>
        </IconButton>
      <Table>
        <TableBody
          displayRowCheckbox={false}
        >
          <TableRow>
            <TableRowColumn>
              {'Company'}
            </TableRowColumn>
            <TableRowColumn>
            {this.state.isEditing ?
                  <TextField
                    id="company"
                    onChange={this.onChange('company')}
                    type="text"
                    value={this.state.company}
                  />
                  :
                  <div>
                  {this.state.apps[this.props.appid].company}
                </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Position'}
            </TableRowColumn>
            <TableRowColumn>
            {this.state.isEditing ?
                  <TextField
                    id="position"
                    onChange={this.onChange('position')}
                    type="text"
                    value={this.state.position}
                  />
                  :
                  <div>
                  {this.state.apps[this.props.appid].position}
                </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Name'}
            </TableRowColumn>
            <TableRowColumn>
            {this.state.isEditing ?
                  <TextField
                    id="contactName"
                    onChange={this.onChange('contactName')}
                    type="text"
                    value={this.state.contactName}
                  />
                  :
                  <div>
                  {this.state.apps[this.props.appid].contactName}
                </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Contact Email'}
            </TableRowColumn>
            <TableRowColumn>
            {this.state.isEditing ?
                  <TextField
                    id="contactEmail"
                    onChange={this.onChange('contactEmail')}
                    type="text"
                    value={this.state.contactEmail}
                  />
                  :
                  <div>
                  {this.state.apps[this.props.appid].contactEmail}
                </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Status'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.isEditing ?
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
                  :
                  <div>
                    {this.state.apps[this.props.appid].status}
                  </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Date'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.isEditing ?
                <DatePicker
                  onChange={this.handleDateChange}
                  floatingLabelText="Date"
                  value={this.state.date}
                />
                  :
                  <div>
                    {this.state.apps[this.props.appid].date.slice(0, 16)}
                  </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Offer Amount'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.isEditing ?
                  <TextField
                    id="offerAmount"
                    onChange={this.onChange('offerAmount')}
                    type="text"
                    value={this.state.offerAmount}
                  />
                  :
                  <div>
                    {this.state.apps[this.props.appid].offerAmount}
                  </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'Notes'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.isEditing ?
                  <TextField
                    id="notes"
                    multiLine={true}
                    onChange={this.onChange('notes')}
                    type="text"
                    value={this.state.notes}
                  />
                  :
                  <div>
                    {this.state.apps[this.props.appid].notes}
                  </div>
              }
            </TableRowColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn>
              {'URL'}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.isEditing ?
                  <TextField
                    id="notes"
                    onChange={this.onChange('url')}
                    type="text"
                    value={this.state.url}
                  />
                  :
                  <div>
                    {this.state.apps[this.props.appid].url}
                  </div>
              }
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
  appid: PropTypes.number.isRequired,
};

export default SingleAppView;
