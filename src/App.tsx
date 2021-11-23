import React, {lazy, LazyExoticComponent, Suspense, ComponentType} from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.scss';
import data from './awesome-apps.json';
import {AwesomeApp} from './types';
import Home from './home/Home';

const apps = data as AwesomeApp[];

const lazyRoutes: {
  LazyComponent: LazyExoticComponent<ComponentType<unknown>>;
  location: string;
}[] = [];

for (const app of apps) {
  const {componentName, dirName, location} = app;
  lazyRoutes.push({
    LazyComponent: lazy(() => import(`./${dirName}/${componentName}`)),
    location,
  });
}

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home apps={apps} />}></Route>
        {lazyRoutes.map(({location, LazyComponent}, key) => (
          <Route key={key} path={`${process.env.PUBLIC_URL}/${location}`} element={<LazyComponent />}></Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export default App;
