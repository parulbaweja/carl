import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
  render() {
    return (
            <form>
                <span> {this.generateSections()} </span>
                <span> {this.generateInputs()} </span>
            </form>
    );
  }

  generateSections() {
    var sections = this.props.sections;

    return sections.map(function(section) {
      return <label key={section}>{section}</label>;
    });
  }

  generateInputs() {
    return this.props.inputs.map(function(input) {
      return <input key={input} type="text"/>;
    });
  }
}

Form.propTypes = {
  inputs: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
};

export default Form;
