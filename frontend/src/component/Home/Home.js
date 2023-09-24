import React, { useState, useEffect } from "react";
import "./Home.css";

function Home({ isLoggedIn, username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [previousLogins, setPreviousLogins] = useState([]);
  const [loginTime, setLoginTime] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [isAdminUser, setIsAdminUser] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      message: message,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
    localStorage.setItem("messages", JSON.stringify([...messages, newMessage]));
  };

  useEffect(() => {
    const storedLoginTime = localStorage.getItem("loginTime");
    const storedSessionDuration = localStorage.getItem("sessionDuration");

    setLoginTime(storedLoginTime || "");
    setSessionDuration(storedSessionDuration || "");

    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    // Check if the logged-in user is "admin"
    setIsAdminUser(username === "admin");
  }, [username]);

  useEffect(() => {
    // Fetch previous login data from your backend API
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    try {
      // Fetch user messages
      const messagesResponse = await fetch("/api/user/messages"); // Replace with your API endpoint for messages
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      } else {
        console.error("Failed to fetch messages");
      }

      // Fetch previous logins
      const loginsResponse = await fetch("/api/user/previous-logins"); // Replace with your API endpoint for previous logins
      if (loginsResponse.ok) {
        const loginsData = await loginsResponse.json();
        setPreviousLogins(loginsData);
      } else {
        console.error("Failed to fetch previous logins");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="home-container">
      {isLoggedIn && <h2>Welcome, {username.name}!</h2>}
      <div className="message-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">Enter your message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {isAdminUser && (
        <div className="previous-logins">
          <h3>Previous Logins:</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile_Number</th>
                <th>Messages</th>
              </tr>
            </thead>
            <tbody>
              {previousLogins.map((login, index) => (
                <tr key={index}>
                  <td>{login.name}</td>
                  <td>{login.email}</td>
                  <td>{login.mobileNumber}</td>
                  <td>
                    {login.messages.map((msg, msgIndex) => (
                      <div key={msgIndex}>{msg}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="messages">
        <h3>Your Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
      </div>
      <div className="previous-logins">
        <h3>Previous Login:</h3>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Session Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{loginTime}</td>
              <td>{sessionDuration}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
