import { useState } from "react";

import styles from "./styles.module.css";

const Login: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
  const [password, setPassword] = useState("");
  async function handleLogin() {
    let raw = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(password),
    });
    let isAuthenticated = await raw.json();
    if (isAuthenticated) {
      localStorage.setItem("isAuth", "true");
      onAuthSuccess();
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DRUCKER</h1>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.btn}>
        Login
      </button>
    </div>
  );
};

export default Login;
