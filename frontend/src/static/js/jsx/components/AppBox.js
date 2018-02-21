//import Table from './Table';
import SingleAppView from './SingleAppView';
import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {Redirect} from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

class AppBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      isRightMenuOpen: false,
    };

    var self = this;
    apiRequest('applications', function(body) {
      self.setState({
        rows: body.map(function(row) {
          return [row.applicationID, row.company, row.status, row.lastDate];
        }),
      });
    });

    this.setRightMenuState = this.setRightMenuState.bind(this);
    this.toggleRightMenu = this.toggleRightMenu.bind(this);
    this.setAppId = this.setAppId.bind(this);
  }

  handleToggle(rowNumber, columnNumber) {
    console.log(rowNumber, columnNumber);
    this.setState({
      open: !this.state.open,
      appId: this.state.rows[rowNumber][0],
    });
  }

  setRightMenuState(open) {
    this.setState({
      isRightMenuOpen: open,
    });
  }

  setAppId(id) {
    this.setState({
      appId: id,
    });
  }

  toggleRightMenu(rowNumber, columnNumber) {
    console.log(rowNumber, columnNumber);
    console.log(this.state.rows[rowNumber][0]);
    const isRightMenuOpen = this.state.isRightMenuOpen;
    this.setRightMenuState(!isRightMenuOpen);
    this.setAppId(this.state.rows[rowNumber][0]);
  }

  render() {
    console.log('NEW STATE:' + this.state.appId);
    var headers = [
      <TableHeaderColumn key={0}>{'Companies'}</TableHeaderColumn>,
      <TableHeaderColumn key={1}>{'Status'}</TableHeaderColumn>, <TableHeaderColumn key={2}>{'Recent Activity'}</TableHeaderColumn>,
    ];

    if (this.state.appId) {
      return(
        <Drawer
          docked={false}
          width={'50%'}
          openSecondary={true}
          onRequestChange={this.setRightMenuState}
          open={this.state.isRightMenuOpen}>
           <SingleAppView appid={this.state.appId}/>
         </Drawer>
      );
    }

    return (
      <div>
      <Table onCellClick={this.toggleRightMenu}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {headers}
          </TableRow>
        </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {
              this.state.rows.map((company) => {
                return (
                  <TableRow key={company[0]}>
                      <TableRowColumn>{company[1]}</TableRowColumn>
                    <TableRowColumn>{company[2]}</TableRowColumn>
                    <TableRowColumn>{company[3].slice(0, -13)}</TableRowColumn>
                  </TableRow>
                );
              })
            }
          </TableBody>

        </Table>
      </div>
    );
  }
}

export default AppBox;
