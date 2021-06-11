import './App.css';
import React, { useState, useEffect } from 'react';
import fire from './firebase';

//import Navigation from './components/Navitagion/Navigation';
import LoginPage from './components/Navitagion/LoginPage/LoginPage';
import Hero from './components/Navitagion/MainMenu/Hero.jsx';

const App = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  //Clears inputs when switching between Sign in and Sign up pages. 
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  //Clears errors when click Sign in or Sign up button. 
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  // Checks user information from database. If true, it logs in.
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  // The function that the user uses when registering with the application. 
  // If the email and password format is correct, it adds the user to the database.
  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/week-password':
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };
  // used when the user logs out of the application.
  const handleLogOut = () => {
    fire.auth().signOut();
  };


  // If the user has logged into the application before, it checks it and opens the application directly.
  // No need to login again.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };
  useEffect(() => {
    authListener();
  }, [authListener]);



  //The part where the page is rendered. If the user (if logged in) exists, the Login page opens. 
  return (
    <div className="App">
      {user ? (
        <Hero handleLogOut={handleLogOut} />
      ) : (
        <LoginPage
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          setHasAccount={setHasAccount}
          hasAccount={hasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
};

export default App;
