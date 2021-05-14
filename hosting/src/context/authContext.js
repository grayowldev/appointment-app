import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../sdk';

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export  function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [currentUserData, setCurrentUserData] = useState()

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout(){
        return auth.signOut()
    }

    function addCurrentUserData(data){
        setCurrentUserData(data)
        return currentUserData;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])


    const value = {
        currentUser,
        login,
        signup,
        logout,
        currentUserData,
        addCurrentUserData
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


