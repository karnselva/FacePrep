import {Routes,Route,useNavigate} from "react-router-dom"
import Login from "./screen/Login";
import Home from "./screen/Home";
import './App.css';
import { useState,useEffect } from "react";

const isLogin=localStorage.getItem("login")=== "true"

function App() {
  const [login,setLogin]=useState<boolean>(isLogin)
  const navigate=useNavigate()
  useEffect(()=>{
     
      login ? navigate("/home")  :  navigate("/")
      
  },[login])
  return (
    <div className="App">
    <Routes>
      { !login ? 
      <Route path="/" element={<Login setLogin={setLogin}/>}/> :
      <Route path="/home" element={<Home setLogin={setLogin}/>} /> }
      <Route/>
    </Routes>
   
    </div>
  );
}

export default App;
