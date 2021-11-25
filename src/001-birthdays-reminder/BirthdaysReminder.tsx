import React, {useState} from 'react';

import './BirthdaysReminder.scss';
import data from './data';
import {Profile} from './profile.type';
import ProfilePreview from './components/profile-preview/ProfilePreview';

const BirthdaysReminder = () => {
  const [profiles, setProfiles] = useState<Profile[]>(data);

  const onClearAll = () => setProfiles([]);

  return (
    <div className="page page-birthdays-reminder">
      <div className="birthdays-reminder">
        <div className="list">
          <div className="headline-4">{profiles.length} birthdays today</div>
          <div className="list__items">
            {profiles.map((profile, id) => (
              <div key={id} className="list__item">
                <ProfilePreview {...profile} />
              </div>
            ))}
          </div>
          <button className="button" onClick={() => onClearAll()}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdaysReminder;
