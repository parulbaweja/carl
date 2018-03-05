import React from 'react';
import PropTypes from 'prop-types';
import AppView from './AppView';
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
          onChange={this.handleChange}
          value={this.state.section}
        >
          <Tab label="Details" value="details">
            <AppView appId={this.props.appId}/>
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
