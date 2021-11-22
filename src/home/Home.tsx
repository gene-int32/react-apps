import React, {Suspense, useState, useEffect, lazy, LazyExoticComponent, ComponentType} from 'react';
import {Routes, Route, Link, Outlet} from 'react-router-dom';

import data from '../app-data.json';
import {AppData} from '../types';
import './Home.scss';
import AppCard from './components/app-card/AppCard';
import AppList from './components/app-list/AppList';

const rawAppData: AppData[] = data;

const lazyRoutes: {
  LazyComponent: LazyExoticComponent<ComponentType<unknown>>;
  location: string;
}[] = [];

for (const app of rawAppData) {
  const {componentName, dirName, location} = app;

  lazyRoutes.push({
    LazyComponent: lazy(() => import(`../${dirName}/${componentName}`)),
    location,
  });
}

const Home = () => {
  const [appData, setAppData] = useState<AppData[]>([]);

  useEffect(() => {
    setAppData(rawAppData);
  }, []);

  return (
    <Suspense fallback={<></>}>
      <Routes>
        {lazyRoutes.map(({location, LazyComponent}, key) => (
          <Route key={key} path={location} element={<LazyComponent />}></Route>
        ))}
      </Routes>
      <div className="home">
        <div className="home__headline headline-4">Awesome React Apps</div>
        <AppList>
          {appData.map((app, i) => (
            <AppCard key={i} {...app} />
          ))}
        </AppList>
      </div>
    </Suspense>
  );
};

export default Home;
