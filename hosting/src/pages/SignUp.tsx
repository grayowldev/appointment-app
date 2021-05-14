import React, { useRef, useState } from 'react'
import '../stylesheet/login-signup.css';
import {createUserData} from '../sdk'
import { useAuth } from '../context/authContext'
import { Link,useHistory } from 'react-router-dom';


function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup,currentUser } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    

    const initialFormData = Object.freeze({
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });
    const [formData,updateFormData] = React.useState(initialFormData);

    const handleChange = (e:any) => {
        updateFormData({
            ...formData,

            [e.target.name]: e.target.value.trim()
        })
    }

     async function handleSubmit(e:any) {
        e.preventDefault()

        if (formData.password.length < 8){
            return setError("Password needs to ba at least 8 characters long.")
        }

        try {
            setError("")
            setLoading(true)
            const newuser = await signup(formData.email,formData.password);
            console.log(newuser.user.uid);
            
            const data = {
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "email": formData.email,
                "phoneNumber": formData.phoneNumber,
                "uid": newuser.user.uid
            }

            const reply = await createUserData(data);
            setUserInfo(data)
            history.push("/show-appointments")
        } catch {
            setError("Failed to create account.")
        }
        setLoading(false)
    }

    return (
        
        <div className="signup-login">
            <div className="text-center">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Create an account</h1>
                    <label htmlFor="inputFirstName"  className="sr-only"></label>
                    <input className="form-control" name="firstName" type="text" id="inputFirstName" placeholder="FirstName" onChange={handleChange} required autoFocus/>
                    <label htmlFor="inputLasttName" className="sr-only"></label>
                    <input className="form-control" name="lastName" type="text" id="inputLastName" placeholder="Last Name" onChange={handleChange} required/>
                    <label htmlFor="inputEmail" className="sr-only"></label>
                    <input className="form-control" name="email" type="email" id="inputEmail" placeholder="Email" onChange={handleChange} required/>
                    <label htmlFor="inputPhone" className="sr-only"></label>
                    <input className="form-control" name="phoneNumber" type="number" id="inputPhone" placeholder="Phone Number" onChange={handleChange}/>
                    <label htmlFor="inputPassword" className="sr-only"></label>
                    <input className="form-control" name="password" type="password" id="inputPassword" placeholder="Password" onChange={handleChange} required></input>
                    <button onClick={handleSubmit} disabled={loading} className="btn btn-lg btn-primary btn-black" type="submit">Create Account</button>
                </form>
                <h6>Already have an account?  <Link to="/signin">Sign in</Link></h6>

            </div>
        </div>
    )
}

export default SignUp
