import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { useNavigate } from 'react-router';
import axios from 'axios';


function AddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        gmail: "",
        age: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure `name` and `value` from the event target
        setInputs((prevState) => ({
            ...prevState,
            [name]: value, // Update the corresponding input field
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await sendRequest();
        window.alert("User added successfully");
        history('/userdetails');
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/users", {
                name: inputs.name,
                gmail: inputs.gmail,
                age: inputs.age,
                address: inputs.address,
            });
            return response.data;
        } catch (error) {
            console.error("Error during the request:", error);
        }
    };

    return (
        <div>
            <Nav />
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <br />
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name}
                    required
                />
                <br />
                <br />
                <label>Email:</label>
                <br />
                <input
                    type="email"
                    name="gmail"
                    onChange={handleChange}
                    value={inputs.gmail}
                    required
                />
                <br />
                <br />
                <label>Age:</label>
                <br />
                <input
                    type="number"
                    name="age"
                    onChange={handleChange}
                    value={inputs.age}
                    required
                />
                <br />
                <br />
                <label>Address:</label>
                <br />
                <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={inputs.address}
                    required
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddUser;
