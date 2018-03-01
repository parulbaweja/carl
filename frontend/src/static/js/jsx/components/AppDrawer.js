import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import FlatButton from 'material-ui/FlatButton';
import SingleAppView from './SingleAppView';
import EditView from './EditView';
import StatusChange from './StatusChange';
import News from './News';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: true,
      activity: false,
      news: false,
    };

    this.setDetails = this.setDetails.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.setNews = this.setNews.bind(this);

  }

  setDetails() {
    this.setState({
      details: true,
      activity: false,
      news: false,
    });
  }

  setActivity() {
    this.setState({
      details: false,
      activity: true,
      news: false,
    });
  }

  setNews() {
    this.setState({
      details: false,
      activity: false,
      news: true,
    });
  }

  render() {
    return (
      <div>
      <FlatButton
        onClick={this.setDetails}
        label="Details"
      />
      <FlatButton
        label="Activity"
        onClick={this.setActivity}
      />
      <FlatButton
        label="News"
        onClick={this.setNews}
      />
      {this.props.appid && this.state.details && !this.state.edit && !this.state.activity &&
          <SingleAppView appid={this.props.appid}/>
      }
      {this.state.activity && !this.state.details && !this.state.edit &&
          <StatusChange appid={this.props.appid}/>
      }
      {this.state.news && !this.state.details && !this.state.activity &&
          <News appid={this.props.appid}/>
      }
    </div>
    );
  }
}

AppDrawer.propTypes = {
  appid: PropTypes.number.isRequired,
};

export default AppDrawer;
