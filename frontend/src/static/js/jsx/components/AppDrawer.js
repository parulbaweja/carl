import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import FlatButton from 'material-ui/FlatButton';
import SingleAppView from './SingleAppView';
import EditView from './EditView';
import StatusChange from './StatusChange';
import News from './News';
import {Tabs, Tab} from 'material-ui/Tabs';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 'details',
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(value) {
    this.setState({
      section: value,
    });
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.section}
          onChange={this.handleChange}
        >
          <Tab label="Details" value="details">
            <SingleAppView appId={this.props.appId}/>
          </Tab>
          <Tab label="Activity" value="activity">
            <StatusChange appId={this.props.appId}/>
          </Tab>
          <Tab label="News" value="news">
            <News appId={this.props.appId}/>
          </Tab>
        </Tabs>
    </div>
    );
  }
}

AppDrawer.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default AppDrawer;
