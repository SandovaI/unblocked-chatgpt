import Head from "next/head";
import styles from "../styles/Home.module.css";
import Directions from "../components/directions";
import APIForm from "../components/api-form";
export default function Home() {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main className={styles.main}>
        <form action="/api/conversation" method="GET">
          <div>
            <label>Ask ChatGPT: </label>
            <input type="text" name="q" required></input>
            <button type="submit">Submit</button>
          </div>
        </form>
      </main>
      <footer></footer>
    </>
  );
}
