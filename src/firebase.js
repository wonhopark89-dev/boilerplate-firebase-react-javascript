import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCog_qbXlbwLTd9B8xxE2PtOkgwCPgMe-4',
  authDomain: 'web-react-twitter.firebaseapp.com',
  databaseURL: 'https://web-react-twitter.firebaseio.com',
  projectId: 'web-react-twitter',
  storageBucket: 'web-react-twitter.appspot.com',
  messagingSenderId: '337648759059',
  appId: '1:337648759059:web:f7a3a64117fb51b234eae6',
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
