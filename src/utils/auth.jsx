import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

// Register user
export const register = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return updateProfile(userCredential.user, {
                displayName: name,
            }).then(() => userCredential.user);
        })
        .catch(error => { throw error });
};

// Sign in user
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => userCredential.user)
        .catch(error => { throw error });
};

// Sign out user
export const signOutUser = () => {
    return signOut(auth)
        .then(() => {
            console.log("User signed out successfully");
        })
        .catch(error => { throw error });
};
