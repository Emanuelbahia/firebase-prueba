import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs,/*  getDoc, */ deleteDoc, doc } from "firebase/firestore";
import  db  from "../../firebaseConfig/firebase.js";
import "./show.css";

const Show = () => {

    const [users, setUsers] = useState([]);

    //referenciamos la base de datos. 
    //Por parametro le pasamos la conexion a la base de datos y el nombre de la table
    const usersCollection = collection(db, "users");

    //funcion para mostrar todos los usuarios
    const getUsers = async () => {
        const data = await getDocs(usersCollection);
        setUsers(
            data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        )
    }

    //funcion para eliminar un usuario
    const deleteUser = async (id) => {
        //usamos DOC q es una funcion de firebase y como parametros la conexion a la base de datos y el nombre de la tabla y el id
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        getUsers(); // dsps de eliminar el usuario mostramos los q quedan
    }

    useEffect(() => {
        getUsers();
    }, [])


  return (
    <>
    <Link to="create" className="link-create">crear usuario</Link>
    <div>
        {
            users.map( user => {
                return (
                    <div key={ user.id } className="div-user">
                        <h3 style={{width: "200px", margin: 0}}>{ user.name } { user.surname }</h3>
                        <Link to={ `/edit/${user.id}` }  >editar</Link>
                        <button onClick={ () => deleteUser(user.id) } className="button-delete">eliminar</button>
                    </div>
                )
                
            })
        }
    </div>
        </>
  )
}

export default Show;
