import React, { useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // https://firebase.google.com/docs/reference/js/firebase.User
      await userObj.updateProfile({ displayName: newDisplayName });
    }
    refreshUser();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input onChange={onChange} type="text" placeholder="Display your name" value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
