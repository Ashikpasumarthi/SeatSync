import React from "react";

export default function ErrorPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Oops! 😢</h1>
      <p>Something went wrong. Please try again later.</p>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}
