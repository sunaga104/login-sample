"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { isReturnStatement } from "typescript";
import { useEffect, useState } from "react";

export default function Main() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>('')

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUser(localStorage.getItem("user"))
    }
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.clear();
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const action = async () => {
    try {
      const response = await fetch("https://login-sample-six.vercel.app/api/action", {
        method: "POST",
        headers: {
          Accept: "application/json",
          ContentType: "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: "",
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <header>
        <p>{user}様</p>
        <div>
          <a onClick={logout}>ログアウト</a>
        </div>
      </header>
      <main>
        <div>
          <h1>メイン</h1>
          <button onClick={action}>アクション</button>
        </div>
      </main>
    </div>
  );
}
