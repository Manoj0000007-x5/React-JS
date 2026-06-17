import React, { useState } from "react";

// List of workshops available for registration
const workshopList = [
  "Python for Beginners",
  "Data Structures Basics",
  "Web Development 101",
  "Git and GitHub Basics",
];

function App() {
  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workshop, setWorkshop] = useState(workshopList[0]);

  // this array stores all registered participants
  const [participants, setParticipants] = useState([]);

  // message shown after submitting the form
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  function handleSubmit(e) {
    e.preventDefault(); // stop page from reloading

    // basic validation - check fields are not empty
    if (name.trim() === "" || email.trim() === "") {
      setMessage("Please fill in both name and email.");
      setMessageType("error");
      return;
    }

    // check if this email is already registered (case-insensitive)
    let alreadyRegistered = false;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].email.toLowerCase() === email.toLowerCase()) {
        alreadyRegistered = true;
        break;
      }
    }

    if (alreadyRegistered) {
      setMessage("This email is already registered for a workshop!");
      setMessageType("error");
      return;
    }

    // create a new participant object
    const newParticipant = {
      id: participants.length + 1,
      name: name,
      email: email,
      workshop: workshop,
    };

    // add new participant to the list
    setParticipants([...participants, newParticipant]);

    // show confirmation message
    setMessage(
      "Thank you " + name + "! You are successfully registered for \"" + workshop + "\"."
    );
    setMessageType("success");

    // clear the form fields
    setName("");
    setEmail("");
    setWorkshop(workshopList[0]);
  }

  return (
    <div className="container">
      {/* all the CSS is kept right here so this is a single file */}
      <style>{`
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          border-radius: 8px;
        }

        h1 {
          text-align: center;
          color: #333;
        }

        .form-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: white;
          padding: 20px;
          border-radius: 6px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        label {
          font-weight: bold;
          margin-top: 8px;
        }

        input,
        select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }

        button {
          margin-top: 15px;
          padding: 10px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }

        .success-msg {
          background-color: #d4edda;
          color: #155724;
          padding: 10px;
          border-radius: 4px;
          margin-top: 15px;
        }

        .error-msg {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 4px;
          margin-top: 15px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
          background: white;
        }

        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        th {
          background-color: #f2f2f2;
        }
      `}</style>

      <h1>Workshop Registration</h1>

      <form onSubmit={handleSubmit} className="form-box">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Select Workshop:</label>
        <select value={workshop} onChange={(e) => setWorkshop(e.target.value)}>
          {workshopList.map((w, index) => (
            <option key={index} value={w}>
              {w}
            </option>
          ))}
        </select>

        <button type="submit">Register</button>
      </form>

      {/* show success or error message after submitting */}
      {message !== "" && (
        <p className={messageType === "success" ? "success-msg" : "error-msg"}>
          {message}
        </p>
      )}

      <h2>Registered Participants ({participants.length})</h2>

      {participants.length === 0 ? (
        <p>No participants registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Workshop</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.workshop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;