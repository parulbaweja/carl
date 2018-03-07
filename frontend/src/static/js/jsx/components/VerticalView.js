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
import List, {ListItem, ListItemText} from 'material-ui/List';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

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
    this.state = {apps: undefined,
      isAddingPro: -1,
      isAddingCon: -1,
      company: '',
      position: '',
      status: '',
      offerAmount: '',
      pro: '',
      con: '',
      appId: undefined,
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
      self.setState(Object.assign({
        apps: body,
      }, body[self.props.appId]
      ));
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

    console.log(this.state);

    return (
      <Card>
        <CardContent>
          <Typography><b>Company:</b> {this.state.company}</Typography>
          <Typography><b>Position:</b> {this.state.position}</Typography>
          <Typography><b>Status:</b> {this.state.status}</Typography>
          <Typography><b>Offer:</b> {this.state.offerAmount}</Typography>
            <Divider/>
          <Typography><b>Pros:</b></Typography>
              {this.state.apps[this.props.appId].pros.map((pro, i) => {
                return (
                  <Typography key={i}>{pro}</Typography>
                );
              })
              }
              {this.state.isAddingPro != this.props.appId ?
                      <Button
                        onClick={this.handlePro(this.props.appId)}>
                        {'add pro'}
                      </Button>
                      :
                      <div>
                      <TextField
                        id="pro"
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

            <Divider/>
              <Typography><b>Cons:</b></Typography>
                  {this.state.apps[this.props.appId].cons.map((con, i) => {
                    return (
                      <Typography key={i}>{con}</Typography>
                    );
                  })
                  }
                  {this.state.isAddingCon != this.props.appId ?
                      <Button
                        icon={<RemoveIcon/>}
                        label={'add con'}
                        onClick={this.handleCon(this.props.appId)}>
                        {'add con'}
                      </Button>
                      :
                      <div>
                      <TextField
                        id="con"
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
                    </div>
                  }
        </CardContent>
      </Card>
    );
  }
}

VerticalView.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default VerticalView;
