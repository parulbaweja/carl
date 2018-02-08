import Form from './Form';
import React from 'react';
import {postRequest} from '../utils/jobsSDK';

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
        <input type="text" id="company" value={this.state.company} onChange={this.onChange('company')}/>
            <br/>
            <label>{'Position'}</label>
        <input type="text" id="position" value={this.state.position} onChange={this.onChange('position')}/>
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
            <input type="text" id="contactEmail" value={this.state.contactEmail} onChange={this.onChange('contactEmail')}/>
            <br/>
            <label>{'Status'}</label>
                <select value={this.state.status} onChange={this.onChange('status')}>
                    <option value="Accepted">{'Accepted'}</option>
                    <option value="Applied">{'Applied'}</option>
                    <option value="Interested">{'Interested'}</option>
                    <option value="Interview">{'Interview'}</option>
                    <option value="Not a fit">{'Not a fit'}</option>
                    <option value="Offer">{'Offer'}</option>
                    <option value="Phone">{'Phone call'}</option>
                    <option value="Withdrawn">{'Withdrawn'}</option>
                </select>
            <br/>
            <label>{'Offer Amount'}</label>
        <input type="text" id="offerAmount" value={this.state.offerAmount} onChange={this.onChange('offerAmount')}/>
            <br/>
            <label>{'Notes'}</label>
            <textarea id="notes" value={this.state.notes} onChange={this.onChange('notes')}></textarea>
            <br/>
            <label>{'URL'}</label>
        <input type="text" id="url" value={this.state.url} onChange={this.onChange('url')}/>
            <br/>
            <button onClick={this.onSubmit}>{'Submit'}</button>
        </form>);
  }
}

export default ApplicationForm;
