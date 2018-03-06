import React from 'react';
import PropTypes from 'prop-types';
import EditView from './EditView';
import SingleAppView from './SingleAppView';
import IconButton from 'material-ui/IconButton';
import CreateIcon from 'material-ui-icons/Create';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };

    this.editSection = this.editSection.bind(this);
    this.editViewChange = this.editViewChange.bind(this);
  }

  editViewChange(newState) {
    this.setState({
      isEditing: newState,
    });
  }

  editSection() {
    this.setState({
      isEditing: true,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
    <IconButton onClick={this.editSection} style={{top:0, right:0}}>
          <CreateIcon style={{top:0, right:0}}/>
        </IconButton>
    {this.state.isEditing ?
        <EditView
          appId={this.props.appId}
          initialEditing={this.state.isEditing}
          callback={(newState) => this.editViewChange(newState)}
        />
        :
        <SingleAppView appId={this.props.appId}/>
    }
  </div>
    );
  }
}

AppView.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default AppView;
