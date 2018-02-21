import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import FlatButton from 'material-ui/FlatButton';
import SingleAppView from './SingleAppView';
import EditView from './EditView';

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

  }

  setDetails() {
    const isDetailsOpen = this.state.details;
    this.setState({
      details: !isDetailsOpen,
    });
  }

  setEdit() {
    this.setState({
      edit: !this.state.edit,
    });
  }

  render() {
    console.log(this.state);
    console.log(!this.state.details);
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
      />
      {this.state.details && !this.state.edit &&
          <SingleAppView appid={this.props.appid}/>
      }
      {this.state.edit &&
          <EditView appid={this.props.appid}/>
      }
    </div>
    );
  }
}

AppDrawer.propTypes = {
  appid: PropTypes.number.isRequired,
};

export default AppDrawer;
