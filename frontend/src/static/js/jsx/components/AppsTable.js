import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../utils/jobsSDK';
import {postRequest} from '../utils/jobsSDK';
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';
import AppDrawer from './AppDrawer';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import ArchiveIcon from 'material-ui-icons/Archive';
import UnarchiveIcon from 'material-ui-icons/Unarchive';
import CloseIcon from 'material-ui-icons/Close';
import Paper from 'material-ui/Paper';
import JobAppForm from './JobAppForm';
import TextField from 'material-ui/TextField';

class AppsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      searchRows: [],
      isRightMenuOpen: false,
      showPaper: false,
    };

    var self = this;
    apiRequest('applications', function(body) {
      self.setState({
        rows: body,
        searchRows: body,
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
      <TableCell key={0}>{'Companies'}</TableCell>,
      <TableCell key={1}>{'Status'}</TableCell>,
      <TableCell key={2}>{'Last Modified'}</TableCell>,
      <TableCell key={3}></TableCell>,
    ];

    return (
      <div>
        {this.state.appId &&
          <Drawer
            width={'50%'}
            onClose={() => this.setRightMenuState(false)}
            anchor="right"
            open={this.state.isRightMenuOpen}>
              <AppDrawer
                appId={this.state.appId}
                key={this.state.appId}/>
          </Drawer>
        }
        <TextField
          onChange={this.filterList}
        />
      <Table>
        <TableHead
        >
          <TableRow>
            {headers}
          </TableRow>
        </TableHead>
          <TableBody
          >
            {
              this.state.rows.map((company, i) => {
                if (!this.props.callback(company)) {
                  return null;
                }
                return (
                  <TableRow key={company.appId}>
                    <TableCell><a href={''} onClick={this.openRightMenu(i)}>{company.company}</a></TableCell>
                    <TableCell>{company.status}</TableCell>
                    <TableCell>{company.date.slice(0, -13)}</TableCell>
                    <TableCell>
                    {!company.archive ?
                        <ArchiveIcon onClick={this.archive(i)}/>
                        :
                        <UnarchiveIcon onClick={this.archive(i)}/>
                    }
                  </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>

        </Table>
        <Button variant="fab" color="secondary" aria-label="add" onClick={this.showPaper}>
          <AddIcon/>
        </Button>

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
