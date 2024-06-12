import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    async function registerUser (e) {
        e.preventDefault();

        if(userDetails.email && userDetails.password){
            axios.post("http://localhost:3100/api/auth/register", userDetails).then((res) => {
                console.log("res", res);
                navigate("/login")
            })
        }
    }
  return (
    <section className='d-flex justify-content-center align-items-center login-section '>
        <form action="" onSubmit={registerUser} className='card p-5 login-form'>
            <h3 className='text-center mb-3'>Register Here</h3>
            <div className='my-2 '>
                <label htmlFor="" className='form-label'>Email</label>
                <input type="email" required className='form-control' onChange={(e) => {
                    setUserDetails(
                       { ...userDetails, email: e.target.value}
                    )
                }} />
            </div>
            <div className='my-2 '>
                <label htmlFor=""  className='form-label'>Password</label>
                <input type="text" className='form-control' required minLength={8} onChange={(e) => {
                    setUserDetails(
                       { ...userDetails, password: e.target.value}
                    )
                }} />
            </div>
            <button type='submit' className='btn btn-success mt-3'>Register</button>
            <p>Already have an Account ? <Link to="/login">login</Link> </p>
        </form>
    </section>
  )
}

export default Register