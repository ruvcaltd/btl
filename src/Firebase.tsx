import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBfEVm9wldlkfp6lidnLAcHkEEN1f2iknw",
    authDomain: "ruvca-btl.firebaseapp.com",
    databaseURL: "https://ruvca-btl.firebaseio.com",
    projectId: "ruvca-btl",
    storageBucket: "ruvca-btl.appspot.com",
    messagingSenderId: "587990058453",
    appId: "1:587990058453:web:3fd764f3f5838525"
  };
firebase.initializeApp(firebaseConfig);
export default firebase;