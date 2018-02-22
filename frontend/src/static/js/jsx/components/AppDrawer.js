import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import FlatButton from 'material-ui/FlatButton';
import SingleAppView from './SingleAppView';
import EditView from './EditView';
import StatusChange from './StatusChange';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: true,
      edit: false,
      activity: false,
    };

    this.setDetails = this.setDetails.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.setActivity = this.setActivity.bind(this);

  }

  setDetails() {
    this.setState({
      details: true,
      edit: false,
      activity: false,
    });
  }

  setEdit() {
    this.setState({
      edit: true,
      details: false,
      activity: false,
    });
  }

  setActivity() {
    this.setState({
      edit: false,
      details: false,
      activity: true,
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
        label="Edit"
        onClick={this.setEdit}
      />
      <FlatButton
        label="Activity"
        onClick={this.setActivity}
      />
      {this.state.details && !this.state.edit && !this.state.activity &&
          <SingleAppView appid={this.props.appid}/>
      }
      {this.state.edit && !this.state.details && !this.state.activity &&
          <EditView appid={this.props.appid}/>
      }
      {this.state.activity && !this.state.details && !this.state.edit &&
          <StatusChange appid={this.props.appid}/>
      }
    </div>
    );
  }
}

AppDrawer.propTypes = {
  appid: PropTypes.number.isRequired,
};

export default AppDrawer;
