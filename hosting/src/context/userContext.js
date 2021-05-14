import React, {useContext, useState, useEffect} from 'react';

const UserContext = React.createContext()

export function useUser(){
    return useContext(UserContext)
}

export default UserContext;
