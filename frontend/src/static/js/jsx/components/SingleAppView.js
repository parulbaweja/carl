// import Table from './Table';
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
// import EditTable from 'material-ui-table-edit';

//   {value: 'Position', type: 'TextField', width: 200},
//   {value: 'Contact Name', type: 'TextField', width: 200},
//   {value: 'Contact Email', type: 'TextField', width: 200},
//   {value: 'Status', type: 'TextField', width: 200},
//   {value: 'Offer Amount', type: 'TextField', width: 200},
//   {value: 'Notes', type: 'TextField', width: 200},
//   {value: 'URL', type: 'TextField', width: 200}
// }

// const rows = [
//   {columns: [
//     {value: 'Facebook'},
//     {value: 'SWE'},
//     {value: 'Me'},
//     {value: 'me@gmail.com'},
//     {value: 'Interested'},
//     {value: '123456'},
//     {value: 'hello this is me'},
//     {value: 'www.facebook.com/jobs/posting2'}
//   ]}
// ]

// const onChange = (row) => {
//   console.log(row)
// }

// const onDelete = (e) => {
//   console.log(e)
// }

// class Main extends React.Component {
//   render () {
//     return (
//       <EditTable
//         onChange={onChange}
//         onDelete={onDelete}
//         rows={rows}
//         headerColumns={headers}
//         enableDelete={true}
//       />
//     )
//   }
// })

const headers = ['Company', 'Position', 'Contact Name', 'Contact Email', 'Status', 'Offer Amount', 'Notes', 'URL'];

class SingleAppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      position: '',
      contactName: '',
      contactEmail: '',
      status: '',
      offerAmount: '',
      notes: '',
      url: '',
    };

    var self = this;
    apiRequest('user/app/1/1', function(body) {
      // console.log(body);
      self.setState({
        company: body.company,
        position: body.position,
        contactName: body.contactName,
        contactEmail: body.contactEmail,
        status: body.status,
        offerAmount: body.offerAmount,
        notes: body.notes,
        url: body.url,
      }
        // rows: body.map(function(row) {
        //   return [row.company, row.position, row.contactName, row.contactEmail, row.status, row.offerAmount, row.notes, row.url];
        );
    });
  }

  render() {
    console.log(this.state);
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {headers.map((header, i) => {
              return (
        <TableHeaderColumn key={i}>{header}</TableHeaderColumn>
              );
            })
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          <TableRow>
            <TableRowColumn>
              {this.state.company}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.position}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.contactName}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.contactEmail}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.status}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.offerAmount}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.notes}
            </TableRowColumn>
            <TableRowColumn>
              {this.state.url}
            </TableRowColumn>
          </TableRow>
      </TableBody>
    </Table>);
  }
}

export default SingleAppView;
