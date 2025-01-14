import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function User(props) {
  const {_id,name,gmail,age,address} = props.user;

  const history = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this user?");

    if(userConfirmed){
      try{
        await axios.delete(`http://localhost:5000/users/${_id}`);
        window.alert("User details deleted successfully");
        history('/userdetails');
        window.location.reload(); //Reload the page
      }catch(error){            
        // Handle deletion error if needed
        console.error("Error deleting user details:", error); 
         }
        }
      };


  return (
    <div>
      <h1>User Display</h1>
      <br></br>
      <h1>ID :{_id} </h1>
      <h1>Name :{name} </h1>
      <h1>Gmail :{gmail} </h1>
      <h1>Age :{age} </h1>
      <h1>Address :{address} </h1>
      <Link to={`/userdetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button>
      <br></br><br></br><br></br><br></br>
    </div>
  )
}

export default User;
