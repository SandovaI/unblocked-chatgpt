import { useState } from "react";
import Link from "next/link";
import url from "../constants/api.constants";
import styles from "../styles/api.module.css";
import { useFormInput } from "../hooks/useFormInput";
import { useHandleSubmit } from "../hooks/useHandleSubmit";
export default function APIForm() {
  const inputProps = useFormInput();
  const formProps = useHandleSubmit(inputProps.value);

  return (
    <>
      <form className={styles.form} {...formProps}>
        <p>API Key goes here:</p>
        <textarea
          {...inputProps}
          disabled={formProps.status === "submitting"}
        />
        <br />
        <button
          disabled={
            inputProps.value.length === 0 || formProps.status === "submitting"
          }
        >
          Submit
        </button>
        {formProps.error !== null && <p className="Error">{formProps.error}</p>}
      </form>
      {formProps.status === "Key valid" && (
        <Link href="/chat">
          <button>Go to Chat</button>
        </Link>
      )}
    </>
  );
}

async function submitForm(answer: string) {
  console.log(URL);
  const res = await fetch(`${url.API_URL}/api/validate`, {
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
