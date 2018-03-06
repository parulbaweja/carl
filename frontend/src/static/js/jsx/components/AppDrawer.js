import React from 'react';
import PropTypes from 'prop-types';
import AppView from './AppView';
import StatusChange from './StatusChange';
import News from './News';
import Tabs, {Tab} from 'material-ui/Tabs';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 0,
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event, value) {
    this.setState({
      section: value,
    });
  }

  render() {
    console.log(this.state);
    const value = this.state.section;
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={value}
        >
          <Tab label="Details"/>
          <Tab label="Activity"/>
          <Tab label="News"/>
        </Tabs>

        {this.state.section == 0 &&
            <AppView appId={this.props.appId}/>
        }
        {this.state.section == 1 &&
            <StatusChange appId={this.props.appId}/>
        }
        {this.state.section == 2 &&
            <News appId={this.props.appId}/>
        }
    </div>
    );
  }
}

AppDrawer.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default AppDrawer;
