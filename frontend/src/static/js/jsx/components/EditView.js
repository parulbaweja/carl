import React from 'react';
import PropTypes from 'prop-types';
import {postRequest} from '../utils/jobsSDK';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import AppBox from './AppBox';

//   match.params.app_id
// );

class EditView extends React.Component {
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
      redirect: '/app/dashboard',
    };

    var self = this;
    var id = parseInt(this.props.appId);
    apiRequest(`user/app/${id}`, function(body) {
      // console.log(body)
      var jsonDate = new Date(body.date);
      jsonDate.setDate(jsonDate.getDate() + 1);
      self.setState({
        company: body.company,
        position: body.position,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
        status: body.status,
        offerAmount: body.offerAmount,
        notes: body.notes,
        url: body.url,
        date: jsonDate,
        saved: false,
      }
        );
    });

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  onChange(key) {
    return (e) => {
      var newState = {...this.state};
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

  handleStatusChange(e, index, status) {
    this.setState({
      status,
    });
  }

  onSubmit() {
    postRequest(`application/update/${this.props.appId}`, this.state, function() {
    });
    this.setState({
      saved: true,
    });
  }
    // TODO add onChange function to handle each form input section
    // shift v to select lines and then :sort to sort those lines

  render() {

    console.log(this.state);

    if (this.state.saved) {
      return (<AppBox/>);
    }

    return (
      <div>
      <h3>{'Editing Form'}</h3>
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
            <SelectField
              floatingLabelText="Status"
              value={this.state.status}
              onChange={this.handleStatusChange}
              primaryText={this.state.status}>
              <MenuItem value={1} primaryText="Interested"/>
              <MenuItem value={2} primaryText="Applied"/>
              <MenuItem value={3} primaryText="Phone Call"/>
              <MenuItem value={4} primaryText="Interview"/>
              <MenuItem value={5} primaryText="Offer"/>
              <MenuItem value={6} primaryText="Accepted"/>
              <MenuItem value={7} primaryText="Withdrawn"/>
              <MenuItem value={8} primaryText="Not a Fit"/>
            </SelectField>
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

EditView.propTypes = {
  appId: PropTypes.string.isRequired,
};

export default EditView;