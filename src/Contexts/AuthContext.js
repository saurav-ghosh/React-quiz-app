import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import firebaseConfig from "../../src/Firebase.config";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

initializeApp(firebaseConfig);

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // signup function
    async function signup(name, email, password) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        //update username
        await updateProfile(auth.currentUser, {
            displayName: name,
        });

        const user = auth.currentUser;
        setCurrentUser({
            ...user,
        });
    }

    //login function
    function login(email, password) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    //signOut function
    function logOut() {
        const auth = getAuth();
        return signOut(auth);
    }

    const value = {
        currentUser,
        signup,
        login,
        logOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
