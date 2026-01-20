import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function showFatal(msg: string) {
  const el = document.createElement("pre");
  el.style.padding = "16px";
  el.style.whiteSpace = "pre-wrap";
  el.style.wordBreak = "break-word";
  el.style.fontSize = "14px";
  el.style.fontFamily =
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
  el.textContent = `BioPrecision startup error:\n\n${msg}`;
  document.body.innerHTML = "";
  document.body.appendChild(el);
}

window.addEventListener("error", (e) => {
  showFatal(String((e as any).error?.stack || (e as any).message || e));
});

window.addEventListener("unhandledrejection", (e: any) => {
  showFatal(String(e?.reason?.stack || e?.reason || e));
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
