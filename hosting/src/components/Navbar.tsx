import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import { Link, useHistory } from 'react-router-dom'; 

function Navbar() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError('')

        try {
            await logout()
            history.push('/signin')
        }catch {
            setError("Logout failed")
        }
        
    }
    return (
        <nav style={{marginBottom: 100}}>
            <h1>Navbar</h1>
            <ul className="nav-items">
                <li>home</li>
                <li>view appointments</li>
                <Link to="/create-appointment"><li>create appointment</li></Link>
            </ul>
            <div>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar
