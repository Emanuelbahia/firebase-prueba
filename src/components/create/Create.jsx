import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./create.css";

const Create = () => {

    const auth = useAuth(); 

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();

    const usersCollection = collection(db, "users");

    const store = async (e) => {
        e.preventDefault();
        
        //usamos el metodo de firestore addDoc, y le pasamos la coleccion y los datos q capturamos del formulario
        await addDoc(usersCollection,{name: name, surname: surname})
        navigate("/");
    }

    const registerFirebase = () => {
         auth.register(name, surname); 
    }

    const google = (e) => {
        e.preventDefault();
        auth.loginWithGoogle();
    }

  return (
    <>
        <button onClick={google}>google</button>
        <h3>Registrate</h3>
        <form onSubmit={registerFirebase}>
            <label>
                <h4>Nombre</h4>
                <input type="email" value={name} onChange={ (e) => setName(e.target.value)} />
            </label>
            <label>
                <h4>Apellido</h4>
                <input type="password" value={surname} onChange={ (e) => setSurname(e.target.value)} />
            </label>
            <button type="submit" className="button-edit">Guardar</button>
        </form>

        <h3>Crear usario</h3>
        <form onSubmit={store}>
            <label>
                <h4>Nombre</h4>
                <input type="text" value={name} onChange={ (e) => setName(e.target.value)} />
            </label>
            <label>
                <h4>Apellido</h4>
                <input type="text" value={surname} onChange={ (e) => setSurname(e.target.value)} />
            </label>
            <button type="submit" className="button-edit">Guardar</button>
        </form> 
    </>
  )
}

export default Create;