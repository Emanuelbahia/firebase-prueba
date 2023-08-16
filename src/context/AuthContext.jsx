//Creo un context para globalizar las funciones de firebase a toda la aplicacion
import { auth } from "../firebaseConfig/firebase";
import { createContext, useContext } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut 
    } from "firebase/auth";


//el contexto va a estar referido a la autenticacion para q toda la aplicacion acceda al usuario q esta logueado
export const authContext = createContext();

//creamos el contexto
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        console.log("no hay contexto")
    }
    return context;
}

//funcion para globalizar el contexto y compartir informacion entre componentes
//y q por props reciba el children
export function AuthProvider({ children }) {
    //funcion q se encarga de registrar un usuario con email y contraseña
    const register = async (email, password) => {
        //pongo auth para q se conecte la autenticacion
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response
    }

    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response
    }

    //funcion de login con google
    const loginWithGoogle = async () => {
        const responseGoogle = new GoogleAuthProvider();
        return await signInWithPopup(auth, responseGoogle)
    }

    //funcion para logout
    const logout = async () => {
        const response = signOut(auth);
        return response;
    }

    //el authContext tiene una propiedad llamada provider q es ñ q se encarga de globalizar el contexto, toda la aplicacion
    //y dsps lo importamos desde app.js
    return (
        //con value exportamos las funciones
        <authContext.Provider value={{  register, login, loginWithGoogle, logout }}>
            { children }
        </authContext.Provider>
        )
}

