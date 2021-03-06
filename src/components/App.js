import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null); // 로그인 시 유저정보를 넣어준다

  useEffect(() => {
    // login, logout
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setUserObj(user); // user object is so big
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:50 }}>
        <footer>&copy; {new Date().getFullYear()} Twitter</footer>
      </div>
    </>
  );
}

export default App;
