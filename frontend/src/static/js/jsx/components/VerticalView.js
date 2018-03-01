import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import {Redirect, Link} from 'react-router';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from 'material-ui/svg-icons/content/add-circle-outline';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

const headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];

class VerticalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: undefined,
      isAddingPro: -1,
      isAddingCon: -1,
      pro: '',
      con: '',
    };

    this.handlePro = this.handlePro.bind(this);
    this.handleCon = this.handleCon.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closePro = this.closePro.bind(this);
    this.closeCon = this.closeCon.bind(this);
  }

  componentDidMount() {
    var self = this;
    apiRequest('apps_repo', function(body) {
      self.setState({
        apps: body,
      });
    });
  }

  handlePro(appid) {
    return () => {
      this.setState({
        isAddingPro: appid,
      });
    };
  }

  handleCon(appid) {
    return () => {
      this.setState({
        isAddingCon: appid,
      });
    };
  }

  closePro() {
    this.setState({
      isAddingPro: -1,
    });
  }

  closeCon() {
    this.setState({
      isAddingCon: -1,
    });
  }

  onChange(key) {
    return (e) => {
      var newState = {};
      newState[key] = e.target.value;
      this.setState(newState);
    };
  }

  render() {
    console.log('vertical view');
    console.log(this.state);

    if (this.props.appid === undefined || this.state.apps === undefined) {
      return null;
    }

    return (
      <div>
      <Table>
        <TableBody
          displayRowCheckbox={false}
        >
          <TableRow>
            <TableRowColumn>
              <b>{'Company'}</b>
            </TableRowColumn>
            {
              this.props.appid.map((company, i) => {
                return (
                <TableRowColumn key={i}>
                  {this.state.apps[company].company}
                </TableRowColumn>
                );
              })
            }
          </TableRow>

          <TableRow>
            <TableRowColumn>
              <b>{'Position'}</b>
            </TableRowColumn>
            {
              this.props.appid.map((company, i) => {
                return (
                <TableRowColumn key={i}>
                  {this.state.apps[company].position}
                </TableRowColumn>
                );
              })
            }
          </TableRow>

          <TableRow>
            <TableRowColumn>
              <b>{'Status'}</b>
            </TableRowColumn>
            {
              this.props.appid.map((company, i) => {
                return (
                <TableRowColumn key={i}>
                  {this.state.apps[company].status}
                </TableRowColumn>
                );
              })
            }
          </TableRow>
          <TableRow>
            <TableRowColumn>
              <b>{'Offer Amount'}</b>
            </TableRowColumn>
            {
              this.props.appid.map((company, i) => {
                return (
                <TableRowColumn key={i}>
                  {this.state.apps[company].offerAmount}
                </TableRowColumn>
                );
              })
            }
          </TableRow>

          <TableRow>
            <TableRowColumn>{'Pros'}
            </TableRowColumn>
              {this.props.appid.map((i) => {
                if (this.state.isAddingPro != i) {
                  return(<TableRowColumn>
                      <FlatButton
                        key={i} label={'add pro'}
                        icon={<AddCircleOutlineIcon/>}
                        onClick={this.handlePro(i)}
                      />
                    </TableRowColumn>);
                } else {
                  return(<TableRowColumn>
                    <TextField
                      id="pro"
                      onChange={this.onChange('pro')}
                      type="text"
                    />
                    <div>
                    <IconButton tooltip="Submit">
                      <CheckIcon/>
                    </IconButton>
                    <IconButton
                      onClick={this.closePro}
                      tooltip="Close">
                      <CloseIcon/>
                    </IconButton>
                  </div>
                  <br/>
                  <br/>
                  </TableRowColumn>
                  );
                }
              }
              )}
            </TableRow>

          <TableRow>
            <TableRowColumn>{'Con'}
            </TableRowColumn>
              {this.props.appid.map((i) => {
                if (this.state.isAddingCon != i) {
                  return(<TableRowColumn>
                      <FlatButton
                        key={i} label={'add con'}
                        icon={<AddCircleOutlineIcon/>}
                        onClick={this.handleCon(i)}
                      />
                    </TableRowColumn>);
                } else {
                  return(<TableRowColumn>
                    <TextField
                      id="con"
                      onChange={this.onChange('con')}
                      type="text"
                    />
                    <div>
                    <IconButton tooltip="Submit">
                      <CheckIcon/>
                    </IconButton>
                    <IconButton
                      onClick={this.closeCon}
                      tooltip="Close">
                      <CloseIcon/>
                    </IconButton>
                  </div>
                  <br/>
                  <br/>
                  </TableRowColumn>
                  );
                }
              }
              )}
            </TableRow>
      </TableBody>
    </Table>
      </div>
    );
  }
}

VerticalView.propTypes = {
  appid: PropTypes.array.isRequired,
};

export default VerticalView;
