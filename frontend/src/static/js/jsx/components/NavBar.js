import React from 'react'; // eslint-disable-line no-unused-vars
// const NavBar = () => (<h1>{'Jobs!'}</h1>);

class NavBar extends React.Component {
  render() {
    return (
        <div className="navbar">
            <h1>{'Jobs!'}</h1>
            <a href={'/app/job_applications'}>{'Job Applications'}</a>
            <a href={'/app/app_form'}>{'New Entry'}</a>
        </div>
    );
  }
}

export default NavBar;
