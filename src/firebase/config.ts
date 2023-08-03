/* const apiKey = process.env.VITE_FIREBASE_API_KEY;
const authDomain = process.env.VITE_FIREBASE_AUTH_DOMAIN;
const databaseURL = process.env.VITE_FIREBASE_DB_URL;
const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = process.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.VITE_FIREBASE_MSG_SENDER_ID;
const appId = process.env.VITE_FIREBASE_APP_ID; */

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  //databaseURL: process.env.VITE_FIREBASE_DB_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MSG_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

export default firebaseConfig;
