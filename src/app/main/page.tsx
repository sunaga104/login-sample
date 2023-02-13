"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { isReturnStatement } from "typescript";

export default function Main() {
  const router = useRouter();
  let user: String | null = "";
  try{
    user = localStorage.getItem("user");
  } catch (e) {
    console.log(e)
  }

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.clear();
      router.push("/login");
    } catch (e){
      console.log(e)
    }
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
