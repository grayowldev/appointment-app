import React, {useContext, useState, useEffect} from 'react'
import {auth,getUserByUid} from '../sdk';

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
        const fetchData = async (user) => {
            const userData = await getUserByUid({uid:user.uid})
            setCurrentUserData(userData)
        }
        const unsubscribe = auth.onAuthStateChanged(async user => {
            setCurrentUser(user)
            if (user){
                await fetchData(user);
            }
            
            // .then((e) => {
            //     setCurrentUserData(e);
            // })
            // const userData = getUserByUid({uid:currentUser.uid})
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


