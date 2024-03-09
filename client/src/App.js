import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Resizable } from 'react-resizable';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ComponentA from './components/ComponentA';
import ComponentB from './components/ComponentB';
import ComponentC from './components/ComponentC';
import './App.css';

// Enhance ResponsiveGridLayout with WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive);

const App = () => {
  // State for managing the layout of resizable components
  const [layout, setLayout] = useState([
    { i: 'a', x: 0, y: 0, w: 3, h: 3 },
    { i: 'b', x: 3, y: 0, w: 3, h: 3 },
    { i: 'c', x: 6, y: 0, w: 3, h: 3 },
  ]);

  // Handle resizing of components
  const handleResize = (index) => (e, { size }) => {
    setLayout((prevLayout) => {
      // Clone the previous layout
      const newLayout = [...prevLayout];
      // Update the width and height of the resized component
      newLayout[index] = {
        ...newLayout[index],
        w: size.width / 100,
        h: size.height / 100,
      };
      // Log the updated layout to the console
      console.log('Resized Layout:', newLayout);
      return newLayout;
    });
  };

  // Handle layout change
  const handleLayoutChange = (newLayout) => {
    // Update the layout state
    setLayout(newLayout);
    // Log the updated layout to the console
    console.log('Layout Change:', newLayout);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      onLayoutChange={handleLayoutChange}
    >
      {layout.map((item, index) => (
        <div key={item.i} className="resizable-component">
          {/* Resizable component for each item in the layout */}
          <Resizable
            width={item.w * 100}
            height={item.h * 100}
            onResize={handleResize(index)}
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
          >
            {/* Render different components based on the index */}
            <div className="component">
              {index === 0 && <ComponentA />}
              {index === 1 && <ComponentB />}
              {index === 2 && <ComponentC />}
            </div>
          </Resizable>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default App;
