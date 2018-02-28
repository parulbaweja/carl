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

const headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];

class VerticalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: undefined,
      isAdding: [],
      pro: '',
    };

    this.handleProCon = this.handleProCon.bind(this);
  }

  componentDidMount() {
    var self = this;
    apiRequest('apps_repo', function(body) {
      console.log('body', body);
      console.log(Object.keys(body).length);
      var isAdding = [];
      for (var i=0; i<Object.keys(body).length + 1; i++) {
        isAdding.push(false);
      }
      self.setState({
        apps: body,
        isAdding: isAdding,
      });
    });
  }

  handleProCon(columnNumber) {
    const isAdding = this.state.isAdding;
    isAdding[columnNumber] = true;
    this.setState({
      isAdding,
    });
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
            <TableRowColumn>{'Pro/Cons'}
            </TableRowColumn>
              {this.props.appid.map((i) => {
                if (!this.state.isAdding[i]) {
                  return(<TableRowColumn>
                      <FlatButton
                        key={i} label={'add pro/con'}
                        icon={<AddCircleOutlineIcon/>}
                        onClick={this.handleProCon(i)}
                      />
                  </TableRowColumn>);
                }
                else {
                  return(<TableRowColumn>
                    <TextField
                      key={i}
                      type="text"
                    />
                  </TableRowColumn>);
                }
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
  appid: PropTypes.array.isRequired,
};

export default VerticalView;
