import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:7000/api/users/login', { email, password });
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setMessage("Logged In");

                setTimeout(() => { navigate('/Csoon')}, 2000);
            } else {
                setMessage('Login failed! Check your email and password.');
            }
        } catch (error) {
            setMessage('Login failed!');
        }
    };

  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl text-amber-500 mb-4">Login</h2>
                <input className="border p-2 mb-2 w-full" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="border p-2 mb-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="primary-btn w-full" onClick={handleLogin}>Login</button>
                <p className="text-amber-500 mt-2 text-center">{message}</p>
            </div>
        </div>
    </>
  )
}

export default LoginPage