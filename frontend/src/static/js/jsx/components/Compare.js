import React from 'react';
import apiRequest from '../utils/jobsSDK';
import RaisedButton from 'material-ui/RaisedButton';
import {Redirect, Link} from 'react-router';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import VerticalView from './VerticalView';

const styles = {
  compare: {
    display: 'flex',
    flexDirection: 'row',
  },
};

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      appIds: [],
      checkedValues: [],
    };

    var self = this;
    apiRequest('applications', function(body) {
      self.setState({
        companies: body.map(function(company) {
          return [company.appId, company.company];
        }),
      });
    });

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(appId) {
    const found = this.state.checkedValues.includes(appId);
    if (found) {
      this.setState({
        checkedValues: this.state.checkedValues.filter(x => x !== appId),
      });
    } else {
      this.setState({
        checkedValues: [...this.state.checkedValues, appId],
      });
    }
  }

  render() {
    return (
      <div style={styles.compare}>
      <div>
        {
          this.state.companies.map((company) => {
            return (
              <Checkbox
                key={company[0]}
                label={company[1]}
                onCheck={() => this.handleCheck(company[0])}
                checked={this.state.checkedValues.includes(company[0])}
              />
            );
          })
        }
      </div>

      <div>
            <VerticalView appId={this.state.checkedValues}/>
      </div>
      </div>
    );
  }
}

export default Compare;
