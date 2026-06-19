import React, { useState } from "react";

const workshopList = [
  "Python for Beginners",
  "Data Structures Basics",
  "Web Development 101",
  "Git and GitHub Basics",
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f4ff",
    padding: "40px 20px",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "660px",
    margin: "0 auto 24px auto",
    boxShadow: "0 10px 30px rgba(79,70,229,0.3)",
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    padding: "3px 12px",
    marginBottom: "12px",
  },
  h1: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 6px 0",
  },
  subText: {
    fontSize: "14px",
    opacity: "0.85",
    margin: "0",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "28px 32px",
    maxWidth: "660px",
    margin: "0 auto 24px auto",
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e1b4b",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "2px solid #f0f4ff",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "Segoe UI, Arial, sans-serif",
    color: "#111827",
    background: "#fafafa",
    outline: "none",
    marginBottom: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
    fontFamily: "Segoe UI, Arial, sans-serif",
  },
  successMsg: {
    background: "#ecfdf5",
    border: "1.5px solid #6ee7b7",
    color: "#065f46",
    padding: "13px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    maxWidth: "660px",
    margin: "0 auto 24px auto",
  },
  errorMsg: {
    background: "#fff1f2",
    border: "1.5px solid #fca5a5",
    color: "#991b1b",
    padding: "13px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    maxWidth: "660px",
    margin: "0 auto 24px auto",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e1b4b",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  countPill: {
    background: "#4f46e5",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    padding: "2px 10px",
    borderRadius: "20px",
  },
  emptyMsg: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "14px",
    padding: "30px 0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    textAlign: "left",
    padding: "11px 14px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4f46e5",
    textTransform: "uppercase",
    background: "#f0f4ff",
  },
  td: {
    padding: "12px 14px",
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
  },
  idCell: {
    padding: "12px 14px",
    fontWeight: "700",
    color: "#4f46e5",
    borderBottom: "1px solid #f3f4f6",
  },
  tag: {
    background: "#ede9fe",
    color: "#5b21b6",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
};

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workshop, setWorkshop] = useState(workshopList[0]);
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "") {
      setMessage("Please fill in both name and email.");
      setMessageType("error");
      return;
    }

    // check if this email is already registered across all workshops
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

    const newParticipant = {
      id: participants.length + 1,
      name: name,
      email: email,
      workshop: workshop,
    };

    setParticipants([...participants, newParticipant]);
    setMessage("Registered successfully for " + workshop + ". See you there, " + name + "!");
    setMessageType("success");

    setName("");
    setEmail("");
    setWorkshop(workshopList[0]);
  }

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <div style={styles.badge}>Student Portal</div>
        <h1 style={styles.h1}>Workshop Registration</h1>
        <p style={styles.subText}>Fill in your details below to secure your spot.</p>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Register for a Workshop</div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Full Name</label>
          <input
            style={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Manoj Kumar"
          />

          <label style={styles.label}>Email Address</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. manoj@college.edu"
          />

          <label style={styles.label}>Select Workshop</label>
          <select
            style={styles.input}
            value={workshop}
            onChange={(e) => setWorkshop(e.target.value)}
          >
            {workshopList.map((w, index) => (
              <option key={index} value={w}>{w}</option>
            ))}
          </select>

          <button type="submit" style={styles.button}>
            Confirm Registration
          </button>
        </form>
      </div>

      {message !== "" && (
        <div style={messageType === "success" ? styles.successMsg : styles.errorMsg}>
          {messageType === "success" ? "Success:  " : "Error:  "}
          {message}
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.sectionTitle}>
          Registered Participants
          <span style={styles.countPill}>{participants.length}</span>
        </div>

        {participants.length === 0 ? (
          <p style={styles.emptyMsg}>No one registered yet. Be the first!</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Workshop</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id}>
                  <td style={styles.idCell}>{p.id}</td>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.email}</td>
                  <td style={styles.td}>
                    <span style={styles.tag}>{p.workshop}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default App;