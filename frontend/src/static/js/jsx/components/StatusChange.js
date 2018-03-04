import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import SendIcon from 'material-ui/svg-icons/content/send';
import BookmarkIcon from 'material-ui/svg-icons/action/bookmark';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import AttachMoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import WorkIcon from 'material-ui/svg-icons/action/work';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const headers = ['Status', 'Date'];

const appId = ({match}) => (
  match.params.app_id
);

const date = new Date();

class StatusChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: undefined,
      isAdding: false,
      date: date,
      status: 1,
    };

    this.getStepperIcon = this.getStepperIcon.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getTimeline() {
    var self = this;
    apiRequest(`timeline/${this.props.appId}`, function(body) {
      self.setState({
        dates: body.map(function(row) {
          return [row.status, row.date.slice(0, 16)];
        }),
      });
    });
  }

  componentDidMount() {
    this.getTimeline();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
      this.getTimeline();
    }
  }

  getStepperIcon(status, icons) {
    if (status == 'Interested') {
      return <BookmarkIcon/>;
    }
    if (status == 'Applied') {
      return <SendIcon/>;
    }
    if (status == 'Phone call') {
      return <PhoneIcon/>;
    }
    if (status == 'Interview') {
      return <WorkIcon/>;
    }
    if (status == 'Offer') {
      return <AttachMoneyIcon/>;
    }
    if (status == 'Accepted') {
      return <CheckCircleIcon/>;
    }
    if (status == 'Withdrawn') {
      return <FeedbackIcon/>;
    }
    if (status == 'Not a fit') {
      return <WarningIcon/>;
    }
  }

  handleClick() {
    this.setState({
      isAdding: true,
    });
  }

  handleDateChange(e, date) {
    var newDate = date.toJSON();
    this.setState({
      date: newDate,
    });
  }

  handleStatusChange(e, index, status) {
    this.setState({
      status,
    });
  }

  render() {
    console.log(this.state);

    if (this.props.appId === undefined || this.state.dates === undefined) {
      return null;
    }
    return (
    <div style={{maxWidth: 300, maxHeight: 400, margin: 'auto'}}>
      <Stepper orientation="vertical">

        <Step>
          <StepLabel
            icon={<IconButton
              iconStyle={{width: 36, height: 36}}
              styles={{width: 72,
                height: 72,
                padding: 16}}
              tooltip={'Add activity'}
              onClick={this.handleClick}
              >
                      <AddCircleIcon/>
                  </IconButton>}
          >
          </StepLabel>
              <StepContent active={true}>
                <p>
                  {'hello'}
                </p>
              </StepContent>
        </Step>

        {this.state.dates.map((status, i) => {
          return (
            <Step key={i}>
              <StepLabel
                key={i}
                icon={this.getStepperIcon(status[0])}
              >
                {status[0]}
              </StepLabel>
              <StepContent active={true}>
                <p>
                  {status[1]}
                </p>
            </StepContent>
            </Step>
          );
        })
        }
      </Stepper>
    </div>
    );
  }
}

StatusChange.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default StatusChange;
