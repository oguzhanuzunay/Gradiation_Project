import firebase from 'firebase'

 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDcP7Js2l9b6jsTe3bWs6kxNqs70-qMqhs",
    authDomain: "graduation-project-86023.firebaseapp.com",
    projectId: "graduation-project-86023",
    storageBucket: "graduation-project-86023.appspot.com",
    messagingSenderId: "1046852282632",
    appId: "1:1046852282632:web:c8fd09ebdd3ca25241e4bd",
    measurementId: "G-D1R0LEF16H"
  };

  const fire =firebase.initializeApp(firebaseConfig);
  export default fire;