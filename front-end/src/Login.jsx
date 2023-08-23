import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {

    const [values,setValues] = useState({
        email : '',
        password : '',
    })

    const navigate = useNavigate('/')

    axios.defaults.withCredentials = true 

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:5050/Login', values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/')
            }else{
                alert(res.data.Message)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log in</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder='Enter email' onChange={e => setValues({...values,email : e.target.value})} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder='Enter password' onChange={e => setValues({...values,password : e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Log in</strong></button>
                    <p>Your are agree to aout terms and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login