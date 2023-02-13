"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  let user: String | null = "";
  if (localStorage) {
    user = localStorage.getItem("user");
  }

  const logout = () => {
    if (localStorage) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.clear();
    }
    router.push("/login");
  };

  const action = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/action", {
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
