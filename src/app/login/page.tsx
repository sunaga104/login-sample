"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    setErrMsg("");
    const body = JSON.stringify({ userId, password });
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          ContentType: "application/json",
        },
        body,
      });
      const jsonData = await response.json();
      console.log(jsonData.status)
      if (jsonData.status) {
        localStorage.setItem("token", jsonData.token);
        localStorage.setItem("user", userId);
        router.push("/main");
      } else {
        setErrMsg("登録されていません");
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginForm}>
        <h1>ログイン画面</h1>
        <span>{errMsg}</span>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          type="text"
          name="userId"
          placeholder="userId"
          required
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="password"
          required
        />
        <br />
        <button onClick={handleSubmit}>ログイン</button>
      </div>
    </main>
  );
}
