import Form from './Form';
import React from 'react';
// import apiRequest from '../utils/appformSDK';

// class ApplicationForm extends React.Component {
//  render() {
//    var sections = ['Company Name', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];
//    return (<Form inputs={sections} sections={sections}/>);
//  }
//}

class ApplicationForm extends React.Component {
  render() {
    return (
        <form>
            <label>Company </label>
            <input type="text" id="company"/>
            <br/>
            <label>Position </label>
            <input type="text" id="position"/>
            <br/>
            <label> Contact Name </label>
            <input type="text" id="contactName"/>
            <br/>
            <label>Contact Email </label>
            <input type="text" id="contactEmail"/>
            <br/>
            <label>Status </label>
                <select>
                    <option value="interested">Interested</option>
                    <option value="applied">Applied</option>
                    <option value="phone">Phone call</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="accepted">Accepted</option>
                    <option value="withdrawn">Withdrawn</option>
                    <option value="notafit">Not a fit</option>
                </select>
            <br/>
            <label>Offer Amount </label>
            <input type="text" id="offerAmount"/>
            <br/>
            <label>Notes </label>
            <textarea id="notes"></textarea>
            <br/>
            <label>URL </label>
            <input type="text" id="url"/>
            <br/>
            <button>Submit</button>
        </form>);
  }
}

export default ApplicationForm;
