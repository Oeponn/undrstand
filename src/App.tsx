
// import React, {useEffect, useState} from 'react';
// import React, {useEffect} from 'react';
// import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import {
  // Footer,
  Header,
} from './components/global';
import {
  Build,
  Home,
  // PageNotFound,
} from './components/pages';

import './css/App.scss';

// eslint-disable-next-line new-cap


// import {isTouchDevice} from './components/shared/helpers';
// const touchScreen = isTouchDevice();


const App = () => {
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
    <div className="appContainer">
      <BrowserRouter>
        {/* <Header loggedIn={loggedIn} /> */}
        <Header />
        <div className="pageContainer">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/build" component={Build} exact={true} />
            {/* <Route component={PageNotFound} /> */}
          </Switch>
        </div>
      </BrowserRouter>

      {/* <Footer /> */}
    </div>
  );
};

export default App;

