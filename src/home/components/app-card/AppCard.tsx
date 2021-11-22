import React from 'react';
import {useNavigate} from 'react-router-dom';

import {AppData} from '../../../types';
import './AppCard.scss';

type AppCardProps = AppData;

const AppCard = ({title, imgSrc, location}: AppCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="app-card" onClick={() => navigate(location)}>
      <div className="app-card__cover">
        <img className="app-card__img" alt={title} src={imgSrc} />
      </div>
      <div className="app-card__content headline-6">{title}</div>
    </div>
  );
};

export default AppCard;
