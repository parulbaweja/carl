import React from 'react';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropSpace from './DropSpace';
import Box from './Box';

class Container extends React.Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <div style={{overflow: 'hidden', clear: 'both'}}>
            <DropSpace/>
          </div>
          <div style={{overflow: 'hidden', clear:'both'}}>
            <Box name="Glass"/>
            <Box name="Banana"/>
            <Box name="Paper"/>
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default Container;
