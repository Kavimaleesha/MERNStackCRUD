import React, { useEffect, useState, useRef } from 'react';
import Nav from '../Nav/Nav';
import axios from "axios";
import User from '../User/User';
import {useReactToPrint} from "react-to-print"

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const ComponentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("User Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const handleSendReport = () => {
    const phoneNumber = "+94763885642"; //Replace with the desired phone number
    const message = "Selected Users Report";
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div>
      <Nav />
      <h1>User Details Display Page</h1>

      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Users Details"
      />
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
      <div ref={ComponentsRef}>
        {users && users.map((user, i) => (
          <div key={i}>
            <User user={user} />
          </div>
        ))}
      </div>

      )}
      <button onClick={handlePrint}>Download Report</button>
      <br />
      <button onClick={handleSendReport}>Send WhatsApp Message</button>
    </div>
  );
}

export default Users;
