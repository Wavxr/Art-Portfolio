import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const Login = ({ setShowLoginModal, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true); // Update state to reflect logged-in status
      setShowLoginModal(false); // Close modal after successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <button
        onClick={() => setShowLoginModal(false)} // Close modal
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
      >
        X
      </button>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleLogin}>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
