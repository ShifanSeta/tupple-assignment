import React, {useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });
    const [isSuccess, success] = useState(false);
    const navigate = useNavigate()
    async function loginUser (e) {
        e.preventDefault();
        if(userDetails.email && userDetails.password){
            axios.post("http://localhost:3100/api/auth/login", userDetails).then((res) => {
                console.log("res", res);
                if(res.status == 200){
                    success(true);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('id', res.data._id);
                    setTimeout(() => {
                        success(false);
                        navigate('/profile')
                        // navigate to dashboard or profile page.
                    }, 5000);
                }
            })
        }
    }
  return (
    <section className='d-flex justify-content-center align-items-center login-section '>
        <form action="" onSubmit={loginUser} className='card p-5 login-form'>
            <h3 className='text-center mb-3'>Welcome Back</h3>
            <div className='my-2 '>
                <label htmlFor="" className='form-label'>Email</label>
                <input type="email" className='form-control'  onChange={(e) => {
                    setUserDetails(
                       { ...userDetails, email: e.target.value}
                    )
                }} />
            </div>
            <div className='my-2 '>
                <label htmlFor="" className='form-label'>Password</label>
                <input type="text" className='form-control'  onChange={(e) => {
                    setUserDetails(
                       { ...userDetails, password: e.target.value}
                    )
                }} />
            </div>
            {isSuccess ? <div class='text-success text-center'>Login successful</div> : ''}
            <button type='submit' className='btn btn-success mt-3'>Login</button>
            <p>Create Account ? <Link to="/register">Register</Link> </p>
        </form>
    </section>
  )
}

export default Login