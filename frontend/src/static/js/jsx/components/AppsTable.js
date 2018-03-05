//import Table from './Table';
import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {postRequest} from '../utils/jobsSDK';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';
import AppDrawer from './AppDrawer';
import IconButton from 'material-ui/IconButton';
import AddCircleOutlineIcon from 'material-ui/svg-icons/content/add-circle-outline';
import ArchiveIcon from 'material-ui/svg-icons/content/archive';
import UnarchiveIcon from 'material-ui/svg-icons/content/unarchive';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Paper from 'material-ui/Paper';
import JobAppForm from './JobAppForm';

class AppsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      isRightMenuOpen: false,
      showPaper: false,
    };

    var self = this;
    apiRequest('applications', function(body) {
      self.setState({
        rows: body,
      });
    });

    this.setRightMenuState = this.setRightMenuState.bind(this);
    this.openRightMenu = this.openRightMenu.bind(this);
    this.setAppId = this.setAppId.bind(this);
    this.showPaper = this.showPaper.bind(this);
    this.closePaper = this.closePaper.bind(this);
    this.updateOnSubmission = this.updateOnSubmission.bind(this);
    this.archive = this.archive.bind(this);
  }

  updateOnSubmission() {
    this.setState({
      showPaper: false,
    });
    var self = this;
    apiRequest('applications', function(body) {
      self.setState({
        rows: body,
      });
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

  showPaper() {
    this.setState({
      showPaper: true,
    });
  }

  closePaper() {
    this.setState({
      showPaper: false,
    });
  }

  archive(rowNumber) {
    var self = this;
    return (e) => {
      e.preventDefault();
      postRequest(
        `archive/${self.state.rows[rowNumber].appId}`,
        self.state,
        function (body) {
          const rows = self.state.rows;
          rows[rowNumber].archive = body.archive;
          self.setState({
            rows,
          });
          console.log(self.state);
        }
      );
    };
  }

  openRightMenu(rowNumber) {
    return (e) => {
      e.preventDefault();
      const isRightMenuOpen = this.state.isRightMenuOpen;
      this.setRightMenuState(!isRightMenuOpen);
      this.setAppId(this.state.rows[rowNumber].appId);
    };
  }

  render() {

    console.log(this.state);
    var headers = [
      <TableHeaderColumn key={0}>{'Companies'}</TableHeaderColumn>,
      <TableHeaderColumn key={1}>{'Status'}</TableHeaderColumn>,
      <TableHeaderColumn key={2}>{'Last Modified'}</TableHeaderColumn>,
      <TableHeaderColumn key={3}></TableHeaderColumn>,
    ];

    return (
      <div>
        {this.state.appId &&
          <Drawer
            docked={false}
            width={'50%'}
            openSecondary={true}
            onRequestChange={this.setRightMenuState}
            open={this.state.isRightMenuOpen}>
              <AppDrawer
                appId={this.state.appId}
                key={this.state.appId}/>
          </Drawer>
        }
      <Table>
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
              this.state.rows.map((company, i) => {
                if (!this.props.callback(company)) {
                  return null;
                }
                return (
                  <TableRow key={company.appId}>
                    <TableRowColumn><a href={''} onClick={this.openRightMenu(i)}>{company.company}</a></TableRowColumn>
                    <TableRowColumn>{company.status}</TableRowColumn>
                    <TableRowColumn>{company.date.slice(0, -13)}</TableRowColumn>
                    <TableRowColumn>
                    {!company.archive ?
                        <ArchiveIcon onClick={this.archive(i)}/>
                        :
                        <UnarchiveIcon onClick={this.archive(i)}/>
                    }
                  </TableRowColumn>
                  </TableRow>
                );
              })
            }
          </TableBody>

        </Table>
        <IconButton
          iconStyle={{width: 48, height: 48, position: 'fixed', right: 0, bottom: 0}}
          style={{width: 96, height: 96, padding: 24, position: 'fixed', right: 0, bottom: 0, margin: 20}}
          onClick={this.showPaper}
        >
          <AddCircleOutlineIcon/>
        </IconButton>

        {this.state.showPaper &&
              <Paper
                style={{overflow: 'auto', height: 600, width: 400, margin: 20, textAlign: 'center', display: 'inline-block', position: 'fixed', bottom: 0, right: 50}}
                zDepth={2}
              >
                <IconButton
                  style={{position: 'absolute', right: 0, top: 0}}
                  onClick={this.closePaper}
                >
                  <CloseIcon/>
                </IconButton>
                <JobAppForm callback={this.updateOnSubmission}/>
              </Paper>
        }
      </div>
    );
  }
}

AppsTable.propTypes = {
  callback: PropTypes.func,
};

AppsTable.defaultProps = {
  callback: () => true,
};

export default AppsTable;
