import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/');
      // console.log(auth);
    }
  })

  const handleLogin = async () => {
    console.log(email, password);
    let results = await fetch("http://localhost:2000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    results = await results.json();
    // console.log(results.result[0].name);
    if(results.result[0].name){
      localStorage.setItem('user', JSON.stringify(results.result));
      localStorage.setItem('token', JSON.stringify(results.auth));
      navigate('/')
    }else{
      alert('Email id or password are incorrect');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="email"
        value={email}
        name="name"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        name="name"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default Login;
