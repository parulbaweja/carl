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


class StatusChange extends React.Component {
  constructor(props) {
    this.state = {
      rows: []
    };

    var self = this;
    apiRequest
