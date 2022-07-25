import './Avatar.css';

import React from 'react';

const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="avatar" className="avatar-img" />
    </div>
  );
};

export default Avatar;
