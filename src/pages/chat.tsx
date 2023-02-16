import { useState } from "react";
import styles from "../styles/chat.module.css";
import url from "../constants/api.constants";
export default function Home() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [messages, setMessages]: any = useState([]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitForm(answer);
      setStatus(res);
      setMessages([
        ...messages,
        { answer: answer, bot: false },
        { answer: res, bot: true },
      ]);
    } catch (err: any) {
      setStatus("typing");
      setError(err.message);
    }
  }

  function handleTextareaChange(e: any) {
    setAnswer(e.target.value);
  }
  async function submitForm(answer: string) {
    const res = await fetch(`${url.API_URL}/api/conversation`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: answer }),
      method: "POST",
    });
    const message = await res.json();
    if (!res.ok) {
      throw new Error(message.error);
    }
    return message;
  }

  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main className={styles.main}>
        <div className={styles.convo}>
          {messages.map((i: any) => (
            <p key={i} className={`${i.bot === true && styles.bot}`}>
              {i.answer}
            </p>
          ))}
        </div>
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
