import React from 'react';

import {Profile} from '../../profile.type';

import './ProfilePreview.scss';

type ProfilePreviewProps = Profile;

const ProfilePreview = ({age, name, photo}: ProfilePreviewProps) => {
  return (
    <div className="profile-preview">
      <img src={photo} alt="" className="profile-preview__photo" />
      <div className="profile-preview__details">
        <div className="profile-preview__name subtitle-1">{name}</div>
        <div className="profile-preview__old caption">{age} years</div>
      </div>
    </div>
  );
};

export default ProfilePreview;
