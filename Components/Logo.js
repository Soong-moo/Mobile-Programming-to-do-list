import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAQ44udOvOVgtBgKOHx8QJA-YudiKfG7kc",
  authDomain: "mobile-programming-3ab25.firebaseapp.com",
  projectId: "mobile-programming-3ab25",
  storageBucket: "mobile-programming-3ab25.appspot.com",
  messagingSenderId: "966526357329",
  appId: "1:966526357329:web:7802e51e9c6fb1ee6a0d70",
  measurementId: "G-T5BF1H7WY9"
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { db };