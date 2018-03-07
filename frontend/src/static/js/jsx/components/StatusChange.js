import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import Stepper, {
  Step,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import SendIcon from 'material-ui-icons/Send';
import BookmarkIcon from 'material-ui-icons/Bookmark';
import PhoneIcon from 'material-ui-icons/Phone';
import AttachMoneyIcon from 'material-ui-icons/AttachMoney';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';
import FeedbackIcon from 'material-ui-icons/Feedback';
import WarningIcon from 'material-ui-icons/Warning';
import WorkIcon from 'material-ui-icons/Work';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

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
      return <BookmarkIcon color="secondary"/>;
    }
    if (status == 'Applied') {
      return <SendIcon color="secondary"/>;
    }
    if (status == 'Phone call') {
      return <PhoneIcon color="secondary"/>;
    }
    if (status == 'Interview') {
      return <WorkIcon color="secondary"/>;
    }
    if (status == 'Offer') {
      return <AttachMoneyIcon color="secondary"/>;
    }
    if (status == 'Accepted') {
      return <CheckCircleIcon color="secondary"/>;
    }
    if (status == 'Withdrawn') {
      return <FeedbackIcon color="secondary"/>;
    }
    if (status == 'Not a fit') {
      return <WarningIcon color="secondary"/>;
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
    <div style={{maxWidth: 300, maxHeight: 400, marginLeft: '25%'}}>
      <Stepper orientation="vertical">

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
                <Typography>{status[1]}</Typography>
            </StepContent>
            </Step>
          );
        })
        }
      </Stepper>
        <Step>
          <StepLabel
            icon={<IconButton
              styles={{width: 72, height: 72, padding: 16}}
              tooltip={'Add activity'}
              onClick={this.handleClick}
                  >
                    <AddCircleIcon/>
                  </IconButton>}
          >
            <Typography>{'Add new activity'}</Typography>
          </StepLabel>
          <StepContent active={true}>
            <Typography>{''}</Typography>
          </StepContent>
        </Step>
    </div>
    );
  }
}

StatusChange.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default StatusChange;
