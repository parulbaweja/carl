import PropTypes from 'prop-types';
import React from 'react';

class Table extends React.Component {
  render() {
    return (
            <table>
                <thead> {this.generateHeaders()} </thead>
                <tbody> {this.generateRows()} </tbody>
            </table>
    );
  }

  generateHeaders() {
    var headers = this.props.headers;

    return headers.map(function(header) {
      return <th key={header}>{header}</th>;
    });
  }

  generateRows() {
    var i = 0;
    var j = 0;
    return this.props.rows.map(function(row) {

      var cells = row.map(function(cell) {
        j++;
        if (cell) {
          return <td key={j}>{cell}</td>;
        }
        return <td key={j}></td>;
      });
      i++;
      return <tr key={i}>{cells}</tr>;
    });
  }
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default Table;
