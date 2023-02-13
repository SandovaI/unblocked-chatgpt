import { useState } from "react";
import Link from "next/link";
export default function APIForm() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitForm(answer);
      setStatus(res);
    } catch (err: any) {
      setStatus("typing");
      setError(err.message);
    }
  }

  function handleTextareaChange(e: any) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        />
        <br />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        <p className="Error">{status}</p>
        {error !== null && <p className="Error">{error}</p>}
      </form>
      {status === "Key valid" && (
        <Link href="/chat">
          <button>Go to Chat</button>
        </Link>
      )}
    </>
  );
}

async function submitForm(answer: string) {
  const res = await fetch("http://localhost:3000/api/validate", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ api_key: answer }),
    method: "POST",
  });
  const message = await res.json();
  if (!res.ok) {
    throw new Error(message.error);
  }
  return message;
}
