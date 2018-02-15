import React from 'react';
import {postRequest} from '../utils/jobsSDK';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const appId = ({match}) => (
  match.params.app_id
);

class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      position: '',
      contactName: '',
      contactEmail: '',
      status: 1,
      offerAmount: '',
      notes: '',
      url: '',
      date: '',
    };

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
        date: body.date,
      }
        );
    });

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  onChange(key) {
    return (e) => {
      var newState = {...this.state};
      newState[key] = e.target.value;
      this.setState(newState);
    };
  }

  handleDateChange(e, date) {
    var newDate = date.toJSON();
    this.setState({
      date: newDate,
    });
  }

  onSubmit() {
    postRequest('application', this.state, function() { });
  }
    // TODO add onChange function to handle each form input section
    // shift v to select lines and then :sort to sort those lines

  render() {
    return (
      <div>
      <h3>{'Job App Entry Form'}</h3>
        <form>
          <TextField
            hintText="Company Name"
            id="company"
            onChange={this.onChange('company')}
            type="text"
            value={this.state.company}
            />
            <br/>
            <TextField
              hintText="Position"
              id="position"
              onChange={this.onChange('position')}
              type="text"
              value={this.state.position}
            />
            <br/>
            <TextField
              hintText="Contact Name"
              id="contactName"
              onChange={this.onChange('contactName')}
              type="text"
              value={this.state.contactName}
            />
            <br/>
            <TextField
              hintText="Contact Email"
              id="contactEmail"
              onChange={this.onChange('contactEmail')}
              type="text"
              value={this.state.contactEmail}
            />
            <br/>
            <DropDownMenu
              hintText="Status"
              value={this.state.status}
              onChange={this.onChange('status')}>
              <MenuItem value={1} primaryText="Interested"/>
              <MenuItem value={2} primaryText="Applied"/>
              <MenuItem value={3} primaryText="Phone Call"/>
              <MenuItem value={4} primaryText="Interview"/>
              <MenuItem value={5} primaryText="Offer"/>
              <MenuItem value={6} primaryText="Accepted"/>
              <MenuItem value={7} primaryText="Withdrawn"/>
              <MenuItem value={8} primaryText="Not a Fit"/>
            </DropDownMenu>
            <br/>
            <DatePicker
              onChange={this.handleDateChange}
              floatingLabelText="Date"
              value={this.state.date}
          />
            <br/>
            <TextField
              hintText="Offer Amount"
              id="offerAmount"
              onChange={this.onChange('offerAmount')}
              type="text"
              value={this.state.offerAmount}
            />
            <br/>
            <TextField
              hintText="Notes"
              id="notes"
              onChange={this.onChange('notes')}
              value={this.state.notes}
            />
            <br/>
            <TextField
              hintText="URL"
              id="url"
              onChange={this.onChange('url')}
              type="text"
              value={this.state.url}
            />
            <br/>
            <FlatButton label="Save" onClick={this.onSubmit}/>
          </form>
        </div>
    );
  }
}

export default EditView;
