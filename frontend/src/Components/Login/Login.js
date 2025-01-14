import React, { useState } from 'react'
import Nav from '../Nav/Nav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
        const history = useNavigate();
        const [user,setUser] = useState({
            name:'',
            gmail:'',
        });
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setUser((prevUser) => ({...prevUser,[name]: value,}));
        };
    
        const handleSubmit = async(e) => {
            e.preventDefault();
            try{
              const response = await sendRequest();
              if (response.status === "ok") {
                alert('Login Success');
                history('/userdetails');
              }else{
                alert('Please Enter Valid Gmail and Password');
              }
            }catch(err){
                alert("error" + err.message); 
            }
        };
    
        const sendRequest = async () => {
           return await axios
            .post("http://localhost:5000/login",{
                gmail:user.gmail,
                password:user.password,
            })
            .then((res) => res.data);
        };
        
  return (
    <div>
        <Nav/>
    <h1>User Login</h1>
      <form onSubmit={handleSubmit}>
        <br></br>
        <br></br>
        <label>Gmail</label>
        <br></br>
        <input 
          type="email" 
          value={user.gmail} 
          onChange={handleInputChange}
          name='gmail' 
          required
         ></input>
        <br></br>
        <br></br>
        <label>Password</label>
        <br></br>
        <input 
          type="Password" 
          value={user.password}
          onChange={handleInputChange}
          name='password' 
          required
        ></input>
        <br></br>
        <br></br>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login;
