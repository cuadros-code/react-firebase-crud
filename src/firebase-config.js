import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD_S_JA-LY4sJgkEcuRGqiMH8ZjT9KtZg0",
  authDomain: "prueba-tecnica-98249.firebaseapp.com",
  projectId: "prueba-tecnica-98249",
  storageBucket: "prueba-tecnica-98249.appspot.com",
  messagingSenderId: "60144928247",
  appId: "1:60144928247:web:04443fbc4fe063b3ce5af2"
};

const app = firebase.apps.length === 0
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const auth = app.auth()

const db = app.firestore()

const GoogleProvider = new firebase.auth.GoogleAuthProvider()

const FacebookProvider = new firebase.auth.FacebookAuthProvider()

export {
  auth,
  db,
  GoogleProvider,
  FacebookProvider
}