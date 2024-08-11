// src/utils/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, createContext, useContext } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBo-sOOB8ZxEUoUSaV0H705ALRZJKP668U",
    authDomain: "clone-8ad01.firebaseapp.com",
    projectId: "clone-8ad01",
    storageBucket: "clone-8ad01.appspot.com",
    messagingSenderId: "1093778312977",
    appId: "1:1093778312977:web:3a9f35cb23aed8284e86b0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export { auth };
