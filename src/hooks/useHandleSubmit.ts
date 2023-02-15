import { useState } from "react";
import url from "../constants/api.constants";
export function useHandleSubmit(input: string) {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitForm(input);
      setStatus(res);
    } catch (err: any) {
      setStatus("typing");
      setError(err.message);
    }
  }
  const formProps = {
    error: error,
    status: status,
    onSubmit: handleSubmit,
  };

  return formProps;
}

async function submitForm(input: string) {
  const res = await fetch(`${url.API_URL}/api/validate`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ api_key: input }),
    method: "POST",
  });
  const message = await res.json();
  if (!res.ok) {
    throw new Error(message.error);
  }
  return message;
}
