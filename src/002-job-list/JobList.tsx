import React, {useState, useEffect} from 'react';

import './JobList.scss';
import data from './data';
import {Position as _Position} from './position.type';

type Position = _Position & {
  expanded: boolean;
};

const JobList = () => {
  const [positions, setPositions] = useState<Position[]>(data.map((d) => ({...d, expanded: false})));
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  useEffect(() => {
    setAllExpanded(positions.every((item) => item.expanded));
  }, [positions]);

  const onToggle = (key: number) => {
    setPositions(
      positions.map((item, index) => ({
        ...item,
        expanded: key === index ? !item.expanded : item.expanded,
      }))
    );
  };

  const onToggleAll = () => {
    setPositions(positions.map((item) => ({...item, expanded: !allExpanded})));
  };

  return (
    <div className="page job-list-page">
      <div className="job-list">
        <div className="job-list__headline headline-5">Latest open positions</div>
        <div className="job-list__toggle-all subtitle-2" onClick={() => onToggleAll()}>
          {allExpanded ? 'Hide' : 'Show'} All
        </div>
        {positions.map((position, key) => (
          <div
            key={key}
            className={`job-list__item position-preview ${position.expanded ? 'position-preview--expanded' : ''}`}
            onClick={() => onToggle(key)}
          >
            <div className="position-preview__main">
              <i className="position-preview__chevron fas fa-chevron-right fa-sm"></i>
              <div className="position-preview__title subtitle-1">{position.title}</div>
              <div className="position-preview__subtitle subtitle-2">{position.subtitle}</div>
              <div className="position-preview__location body-2">
                <i className="fas fa-map-marker-alt"></i> {position.location}
              </div>
            </div>
            <div className={`position-preview__details`}>
              <div className="position-preview__details-content body-2">{position.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
