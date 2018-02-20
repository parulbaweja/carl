// import React from 'react'; // eslint-disable-line no-unused-vars
// import {render} from 'react-dom';
// import {Provider} from 'react-redux';
// import AppRouter from './routes';
// import store from './store';

// render(
//   <Provider store={store}>
//     <AppRouter/>
//   </Provider>,
//   document.getElementById('react-app')
// );

import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import AppRouter from './routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AppRouter/>
  </MuiThemeProvider>,
  document.getElementById('react-app')
);
