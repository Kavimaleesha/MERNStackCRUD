import React from "react";
import { Route, Routes } from "react-router";
import './App.css';
import Home from "./Components/Home/Home";
import AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/User Details/Users";
import UpdateUsers from "./Components/UpdateUser/UpdateUser";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ContactUs from "./Components/ContactUs/ContactUs";
import SendPDF from "./Components/SendPDF/SendPDF";
import Imguploader from "./Components/ImgUploader/Imguploader";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/mainhome" element={<Home/>}/>
          <Route path="adduser" element={<AddUser/>}/>
          <Route path="/userdetails" element={<Users/>}/>
          <Route path="/regi" element={<Register/>}/>
          <Route path="/log" element={<Login/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/sendpdf" element={<SendPDF/>}/>
          <Route path="/imgpart" element={<Imguploader/>}/>
          <Route path="/userdetails/:id" element={<UpdateUsers/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;  
