import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
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
      appids: [],
      checkedValues: [],
    };

    var self = this;
    apiRequest('applications', function(body) {
      self.setState({
        companies: body.map(function(company) {
          return [company.applicationID, company.company];
        }),
      });
    });

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(appid) {
    const found = this.state.checkedValues.includes(appid);
    if (found) {
      this.setState({
        checkedValues: this.state.checkedValues.filter(x => x !== appid),
      });
    } else {
      this.setState({
        checkedValues: [...this.state.checkedValues, appid],
      });
    }
  }

  render() {
    console.log(this.state.companies);
    console.log(this.state.checkedValues);
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
            <VerticalView appid={this.state.checkedValues}/>
      </div>
      </div>
    );
  }
}

export default Compare;
