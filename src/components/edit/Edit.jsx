import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase.js";
import "./edit.css";

const Edit = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const update = async (e) => {
        e.preventDefault();
        const user = doc(db, "users", id);
        const data = {name: name, surname: surname}
        await updateDoc(user, data);
        navigate("/");
    }

    const getUserById = async (id) => {
        const user = await getDoc(doc(db, "users", id));
        console.log(user.data())
        if (user) { 
        setName(user.data().name);
        setSurname(user.data().surname); 
    }
    }
    useEffect(()=>{
        getUserById(id);
    },[])

  return (
    <>
        <h3>Editar usuario</h3>
        <form onSubmit={update}>
            <label>
                <h4>Nombre</h4>
                <input type="text" value={name} onChange={ (e) => setName(e.target.value)} />
            </label>
            <label>
                <h4>Apellido</h4>
                <input type="text" value={surname} onChange={ (e) => setSurname(e.target.value)} />
            </label>
            <button type="submit" className="button-edit">editar</button>
        </form> 
    </>
  )
}

export default Edit;
