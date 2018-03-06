import React from 'react';
import apiRequest from '../utils/jobsSDK';
import Table, {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

const headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];

const appId = ({match}) => (
  match.params.app_id
);

const date = new Date();

class SingleAppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: undefined,
      company: '',
      position: '',
      contactName: '',
      contactEmail: '',
      statusId: 1,
      offerAmount: '',
      notes: '',
      url: '',
      date: undefined,
    };
  }

  componentDidMount() {
    var self = this;
    apiRequest('apps_repo', function(body) {
      self.setState(Object.assign({
        apps: body,
      }, body[self.props.appId]
      ));
      var date = new Date(self.state.date);
      date.setDate(date.getDate() + 1);
      self.setState({
        date: date,
      });
    });

  }

  render() {
    if (this.state.apps === undefined) {
      return null;
    }

    return (
      <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              {'Company'}
            </TableCell>
            <TableCell>
                  {this.state.apps[this.props.appId].company}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Position'}
            </TableCell>
            <TableCell>
                  {this.state.apps[this.props.appId].position}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Contact Name'}
            </TableCell>
            <TableCell>
                  {this.state.apps[this.props.appId].contactName}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Contact Email'}
            </TableCell>
            <TableCell>
                  {this.state.apps[this.props.appId].contactEmail}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Status'}
            </TableCell>
            <TableCell>
                    {this.state.apps[this.props.appId].status}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Date'}
            </TableCell>
            <TableCell>
                    {this.state.apps[this.props.appId].date.slice(0, 16)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Offer Amount'}
            </TableCell>
            <TableCell>
                    {this.state.apps[this.props.appId].offerAmount}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'Notes'}
            </TableCell>
            <TableCell>
                    {this.state.apps[this.props.appId].notes}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              {'URL'}
            </TableCell>
            <TableCell>
                    {this.state.apps[this.props.appId].url}
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
    <Button onClick={this.onSubmit}>
      {'Save'}
    </Button>
      </div>
    );
  }
}

SingleAppView.propTypes = {
  appId: PropTypes.number.isRequired,
};

export default SingleAppView;
