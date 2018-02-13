import Form from './Form';
import React from 'react';
import {postRequest} from '../utils/jobsSDK';
import apiRequest from '../utils/jobsSDK';
import Status from './Status';

// class ApplicationForm extends React.Component {
//  render() {
//    var sections = ['Company Name', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];
//    return (<Form inputs={sections} sections={sections}/>);
//  }
//}

class ApplicationForm extends React.Component {
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
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  showStatus() {
    apiRequest('/status', this.state, function(body) {
      self.setState(function() {
        return {
          status: body.map(function(status) {
            return [
              status.interested, status.applied, status.phoneCall, status.interview, status.offer, status.accepted, status.withdrawn, status.notAFit];
          }),
        };
      });
    });
  }

  onChange(key) {
    return (e) => {
      var newState = {...this.state};
      newState[key] = e.target.value;
      this.setState(newState);
    };
  }

  onSubmit() {
    postRequest('application/1', this.state, function() { });
  }
    // TODO add onChange function to handle each form input section
    // shift v to select lines and then :sort to sort those lines

  render() {
    return (
        <form>
            <label>{'Company'}</label>
            <input
              id="company"
              onChange={this.onChange('company')}
              type="text"
              value={this.state.company}
            />
            <br/>
            <label>{'Position'}</label>
            <input
              id="position"
              onChange={this.onChange('position')}
              type="text"
              value={this.state.position}
            />
            <br/>
            <label>{'Contact Name'}</label>
            <input
              id="contactName"
              onChange={this.onChange('contactName')}
              type="text"
              value={this.state.contactName}
            />
            <br/>
            <label>{'Contact Email'}</label>
            <input
              id="contactEmail"
              onChange={this.onChange('contactEmail')}
              type="text"
              value={this.state.contactEmail}
            />
            <br/>
            <label>{'Status'}</label>
            <select
              onChange={this.onChange('status')}
              value={this.state.status}>
            </select>
            <br/>
            <label>{'Offer Amount'}</label>
            <input
              id="offerAmount"
              onChange={this.onChange('offerAmount')}
              type="text"
              value={this.state.offerAmount}
            />
            <br/>
            <label>{'Notes'}</label>
            <textarea
              id="notes"
              onChange={this.onChange('notes')}
              value={this.state.notes}>
            </textarea>
            <br/>
            <label>{'URL'}</label>
            <input
              id="url"
              onChange={this.onChange('url')}
              type="text"
              value={this.state.url}
            />
            <br/>
            <button onClick={this.onSubmit}>{'Submit'}</button>
        </form>);
  }
}

export default ApplicationForm;
