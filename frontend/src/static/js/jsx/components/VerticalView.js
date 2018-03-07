import React from 'react';
import apiRequest from '../utils/jobsSDK';
import {postRequest} from '../utils/jobsSDK';
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import Grid from 'material-ui/Grid';

const styles = {
  cell: {
    borderBottom: 0,
    flexGrow: 1,
  },
};

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
    this.onSubmitPro = this.onSubmitPro.bind(this);
    this.onSubmitCon = this.onSubmitCon.bind(this);
  }

  componentDidMount() {
    var self = this;
    apiRequest('apps_repo', function(body) {
      self.setState({
        apps: body,
      });
    });
  }

  handlePro(appId) {
    return () => {
      this.setState({
        isAddingPro: appId,
      });
    };
  }

  handleCon(appId) {
    return () => {
      this.setState({
        isAddingCon: appId,
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

  onSubmitPro() {
    var self = this;
    postRequest(`add/pro_con/${self.state.isAddingPro}`, self.state, function(body) {
      var apps = {...self.state.apps};
      apps[self.state.isAddingPro] = body;
      self.setState({
        isAddingPro: -1,
        isAddingCon: -1,
        apps,
      });
    });
  }

  onSubmitCon() {
    var self = this;
    postRequest(`add/pro_con/${self.state.isAddingCon}`, self.state, function(body) {
      var apps = {...self.state.apps};
      apps[self.state.isAddingCon] = body;
      self.setState({
        isAddingPro: -1,
        isAddingCon: -1,
        apps,
      });
    });
  }

  render() {

    if (this.props.appId === undefined || this.state.apps === undefined) {
      return null;
    }

    return (
      <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={styles.cell}>
              <b>{'Company'}</b>
            </TableCell>
            {
              this.props.appId.map((company, i) => {
                return (
                <TableCell key={i} style={styles.cell}>
                  {this.state.apps[company].company}
                </TableCell>
                );
              })
            }
          </TableRow>

          <TableRow>
            <TableCell style={styles.cell}>
              <b>{'Position'}</b>
            </TableCell>
            {
              this.props.appId.map((company, i) => {
                return (
                <TableCell key={i} style={styles.cell}>
                  {this.state.apps[company].position}
                </TableCell>
                );
              })
            }
          </TableRow>

          <TableRow>
            <TableCell style={styles.cell}>
              <b>{'Status'}</b>
            </TableCell>
            {
              this.props.appId.map((company, i) => {
                return (
                <TableCell key={i} style={styles.cell}>
                  {this.state.apps[company].status}
                </TableCell>
                );
              })
            }
          </TableRow>
          <TableRow>
            <TableCell style={styles.cell}>
              <b>{'Offer Amount'}</b>
            </TableCell>
            {
              this.props.appId.map((company, i) => {
                return (
                <TableCell key={i} style={styles.cell}>
                  {this.state.apps[company].offerAmount}
                </TableCell>
                );
              })
            }
          </TableRow>

          <TableRow>
            <TableCell style={styles.cell}><b>{'Pros'}</b>
            </TableCell>
            {this.props.appId.map((appId, i) => {
              return (
                <TableCell key={i} style={styles.cell}>
                  <div>
                  {this.state.apps[appId].pros.map((pro) => {
                    return (
                      <div>
                      {pro}
                    </div>
                    );
                  })
                  }

                  {this.state.isAddingPro != appId ?
                      <Button
                        key={i}
                        onClick={this.handlePro(appId)}>
                        {'add pro'}
                        <AddIcon/>
                      </Button>
                      :
                      <div>
                      <TextField
                        id="pro"
                        key={i}
                        onChange={this.onChange('pro')}
                        type="text"
                      />
                      <div>
                        <IconButton
                          onClick={this.onSubmitPro}
                          tooltip="Submit">
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
                    </div>
                  }
                  </div>

                </TableCell>
              );
            })
            }
          </TableRow>

          <TableRow>
            <TableCell style={styles.cell}><b>{'Cons'}</b>
            </TableCell>
            {this.props.appId.map((appId, i) => {
              return (
                <TableCell key={i} style={styles.cell}>
                  <div>
                  {this.state.apps[appId].cons.map((con) => {
                    return (
                      <div>
                      {con}
                    </div>
                    );
                  })
                  }

                  {this.state.isAddingCon != appId ?
                      <Button
                        icon={<RemoveIcon/>}
                        key={i}
                        label={'add con'}
                        onClick={this.handleCon(appId)}>
                        {'add con'}
                        <RemoveIcon/>
                      </Button>
                      :
                      <div>
                      <TextField
                        id="con"
                        key={i}
                        onChange={this.onChange('con')}
                        type="text"
                      />
                      <div>
                        <IconButton
                          onClick={this.onSubmitCon}
                          tooltip="Submit">
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
                    </div>
                  }
                  </div>

                </TableCell>
              );
            })
            }
          </TableRow>

      </TableBody>
    </Table>
      </div>
    );
  }
}

VerticalView.propTypes = {
  appId: PropTypes.array.isRequired,
};

export default VerticalView;
