import React from 'react';
import {postRequest} from '../utils/jobsSDK';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import PropTypes from 'prop-types';
import Input, {InputLabel} from 'material-ui/Input';

const date = new Date();

class ApplicationForm extends React.Component {
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
      date: date,
    };
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
    var newDate = date.toJSON();
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
    var self = this;
    postRequest('application', this.state, function() {self.props.callback();});
  }
    // TODO add onChange function to handle each form input section
    // shift v to select lines and then :sort to sort those lines

  render() {
    return (
      <div>
      <h3>{'Job App Entry Form'}</h3>
        <form>
          <TextField
            label="Company Name"
            id="company"
            onChange={this.onChange('company')}
            type="text"
            value={this.state.company}
            />
            <br/>
            <TextField
              label="Position"
              id="position"
              onChange={this.onChange('position')}
              type="text"
              value={this.state.position}
            />
            <br/>
            <TextField
              label="Contact Name"
              id="contactName"
              onChange={this.onChange('contactName')}
              type="text"
              value={this.state.contactName}
            />
            <br/>
            <TextField
              label="Contact Email"
              id="contactEmail"
              onChange={this.onChange('contactEmail')}
              type="text"
              value={this.state.contactEmail}
            />
            <br/>
            <InputLabel>Status</InputLabel>
            <br/>
            <Select
              value={this.state.status}
              onChange={this.handleStatusChange}
              input={<Input name="status" id="status-helper"/>}>
              <MenuItem value={1}>{'Interested'}</MenuItem>
              <MenuItem value={2}>{'Applied'}</MenuItem>
              <MenuItem value={3}>{'Phone Call'}</MenuItem>
              <MenuItem value={4}>{'Interview'}</MenuItem>
              <MenuItem value={5}>{'Offer'}</MenuItem>
              <MenuItem value={6}>{'Accepted'}</MenuItem>
              <MenuItem value={7}>{'Withdrawn'}</MenuItem>
              <MenuItem value={8}>{'Not a Fit'}</MenuItem>
            </Select>
            <br/>
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={this.state.date}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleDateChange}
          />
            <br/>
            <TextField
              label="Offer Amount"
              id="offerAmount"
              onChange={this.onChange('offerAmount')}
              type="text"
              value={this.state.offerAmount}
            />
            <br/>
            <TextField
              label="Notes"
              id="notes"
              onChange={this.onChange('notes')}
              value={this.state.notes}
            />
            <br/>
            <TextField
              label="URL"
              id="url"
              onChange={this.onChange('url')}
              type="text"
              value={this.state.url}
            />
            <br/>
            <Button onClick={this.onSubmit}>
              {'Submit'}
            </Button>
          </form>
        </div>
    );
  }
}

ApplicationForm.propTypes = {
  callback: PropTypes.func,
};

ApplicationForm.defaultProps  = {
  callback: () => {},
};

export default ApplicationForm;
