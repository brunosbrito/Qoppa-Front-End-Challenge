import { useEffect, useState } from "react";
import "./register.style.css";
import { Eye, EyeSlash } from "@phosphor-icons/react";

function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/SingUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      if (response.ok) {
        setSuccessMessage("Account created successfully!");
        setShowSuccessMessage(true);
      } 
    } catch (error) {
        setSuccessMessage("server failure!");
        setShowSuccessMessage(true);
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return (
    <div className="container">
      <h1>Create a new account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user">Username:</label>
          <input
            type="text"
            id="user"
            value={user.username}
            onChange={handleChange}
            name="username"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="exaple@exemple.com"
            type="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            name="email"
            required
          />
        </div>
        <div className="password-input">
          <label htmlFor="password">password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            required
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            {!showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
          </div>
        </div>
        <button type="submit">Register</button>
        {showSuccessMessage && (
          <div className="success-message">
            {successMessage} <div className="progress-bar"></div>{" "}
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
