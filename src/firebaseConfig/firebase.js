import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

//todos los parametros de la configuracion en formato json (clave - valor)
const firebaseConfig = {
  apiKey: "AIzaSyDIQG20cI8wwZppyuJM4Sxk1RIPdRTWkMk",
  authDomain: "crud-firebase-react-a58ae.firebaseapp.com",
  projectId: "crud-firebase-react-a58ae",
  storageBucket: "crud-firebase-react-a58ae.appspot.com",
  messagingSenderId: "659920459638",
  appId: "1:659920459638:web:bfa1a64c92b416901ccc57",
};

const app = initializeApp(firebaseConfig);

//conexion a la base de datos

const db = getFirestore(app);

export default db;
