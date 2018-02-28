import React from 'react';
import AppsTable from './AppsTable';

class AppBox extends React.Component {
  render() {
    var self = this;
    function filterfn(company) {
      if (self.props.location.pathname.endsWith('archive')) {
        return company.archive;
      } else {
        return !company.archive;
      }
    }
    return <AppsTable callback={filterfn}/>;
  }
}

export default AppBox;
