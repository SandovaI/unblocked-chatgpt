import { useState } from "react";
import styles from "../styles/Home.module.css";
export default function Home() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  function handleTextareaChange(e: any) {
    setAnswer(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus("submitting");

    try {
    } catch (err: any) {
      setStatus("typing");
      setError(err.message);
    }
  }
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p>Ask Chat:</p>
          <textarea
            value={answer}
            onChange={handleTextareaChange}
            disabled={status === "submitting"}
          />
          <br />
          <button disabled={answer.length === 0 || status === "submitting"}>
            Submit
          </button>
          {error !== null && <p className="Error">{error}</p>}
        </form>
      </main>
      <footer></footer>
    </>
  );
}
function setAnswer(value: any) {
  throw new Error("Function not implemented.");
}
