
// import React, {useLayoutEffect, useState} from 'react';
// import React, {useEffect} from 'react';
// import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {useTheme} from 'components/contexts/ThemeContext';
import {
  // Footer,
  Header,
} from './components/shared';
import {
  About,
  Build,
  Home,
  Settings,
  // PageNotFound,
} from './components/pages';

import './App.scss';

// eslint-disable-next-line new-cap


// import {isTouchDevice} from './components/shared/helpers';
// const touchScreen = isTouchDevice();

// const useWindowSize = () => {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// };


const App = () => {
  // const [width, height] = useWindowSize();
  const {theme} = useTheme();
  // console.log('theme:', theme);


  // const [testBackend, setTestBackend] = useState('Loading backend');
  // useEffect(() => {
  //   fetch('/api/test/').then((res) => {
  //     console.log('res:', res);
  //     return res.json();
  //   })
  //       .then((json) => {
  //         const {test} = json;
  //         console.log('test:', test);
  //         // setTestBackend(test);
  //       });
  // }, []);

  return (
    <div
      className="appContainer"
      // style={
      //   {width: `${width}px`, height: `${height + 1}px`}
      // }
    >
      <div
        className='overlay'
        style={{backgroundColor: theme === 'dark' ? 'black' : 'white'}}
      />
      <BrowserRouter>
        {/* <Header /> */}
        <div className="pageContainer">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/build" component={Build} exact={true} />
            <Route path="/about" component={About} exact={true} />
            <Route path="/settings" component={Settings} exact={true} />
            {/* <Route component={PageNotFound} /> */}
          </Switch>
        </div>
        <Header />
      </BrowserRouter>

      {/* <Footer /> */}
    </div>
  );
};

export default App;

