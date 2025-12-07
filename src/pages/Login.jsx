import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    let response;

    if (isLogin) {
      // LOGIN
      response = await loginUser(email, password);
    } else {
      // REGISTER
      response = await registerUser(name, email, password);
    }

    // Save JWT token + user details
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("userName", response.data.user.name);
    localStorage.setItem("userEmail", response.data.user.email);

    window.location.href = "/notes"; // redirect
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Login;
