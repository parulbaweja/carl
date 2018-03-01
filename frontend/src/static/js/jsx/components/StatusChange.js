import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

const headers = ['Status', 'Date'];

const appId = ({match}) => (
  match.params.app_id
);

class StatusChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: undefined,
    };
  }

  getTimeline() {
    var self = this;
    apiRequest(`timeline/${this.props.appid}`, function(body) {
      self.setState({
        dates: body.map(function(row) {
          return [row.status, row.date];
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

  render() {

    if (this.props.appid === undefined || this.state.dates === undefined) {
      return null;
    }
    return (
    <div style={{maxWidth: 300, maxHeight: 400, margin: 'auto'}}>
      <Stepper orientation="vertical">
        {this.state.dates.map((status, i) => {
          return (
            <Step key={i}>
              <StepLabel key={i}>{status[0]}</StepLabel>
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
  appid: PropTypes.number.isRequired,
};

export default StatusChange;
