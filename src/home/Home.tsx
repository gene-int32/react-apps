import React from 'react';

import {AwesomeApp} from '../types';

import './Home.scss';
import AppCard from './components/app-card/AppCard';
import AppList from './components/app-list/AppList';

type HomeProps = {
  apps: AwesomeApp[];
};

const Home = ({apps}: HomeProps) => {
  return (
    <div className="page">
      <div className="home">
        <div className="home__headline headline-4">Awesome React Apps</div>
        <AppList>
          {apps.map((app, i) => (
            <AppCard key={i} {...app} />
          ))}
        </AppList>
      </div>
    </div>
  );
};

export default Home;
