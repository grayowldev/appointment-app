import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from '../context/authContext'
import '../stylesheet/login-signup.css';
import {getUserByUid} from '../sdk'


function Login() {
    const [error,setError] = useState("")
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const { login, currentUser, addCurrentUserData } = useAuth()
    const history = useHistory()
    

    const initialFormData = Object.freeze({
        password: "",
        email: ""
    });
    const [formData, updateFormData] = React.useState(initialFormData)

    const handleChange = (e:any) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }


    async function handleSubmit(e:any) {
        e.preventDefault()



        try {
            setError("")
            setLoading(true)
            console.log(formData.email,formData.password)
            const user = await login(formData.email,formData.password);

            const data = {
                uid: user.user.uid
            }

            // const userData = await getUserByUid(data);
            // console.log(userData)
            // setUserInfo(userData)
            // addCurrentUserData(userData.data);
            history.push("/show-appointments") 
        } catch {
            setError("Failed to login")
        }
        setLoading(false)
    }

    return (
        <div className="signup-login">
            <div className="text-center">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only"></label>
                    <input className="form-control" name="email" type="email" id="inputEmail" placeholder="Email address" onChange={handleChange} required autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only"></label>
                    <input className="form-control" name="password" type="password" id="inputPassword" placeholder="Password" onChange={handleChange} required/>
                    <button onClick={handleSubmit} className="btn btn-lg btn-primary btn-black" type="submit">Login</button>
                </form>
                <h6>Don't have an account?  <Link to="/signup">Sign up</Link></h6>
            </div>
        </div>

    )
}

export default Login
