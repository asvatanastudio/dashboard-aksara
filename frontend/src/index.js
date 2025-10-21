import React from "react";
import ReactDOM from "react-dom"; // Fallback for older React versions
import "./index.css";
import App from "./App";

// Dapatkan elemen root
const container = document.getElementById("root");

if (container) {
  // Coba gunakan React 18 createRoot
  try {
    const { createRoot } = await import("react-dom/client");
    const root = createRoot(container);

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (e) {
    // Fallback ke metode render lama (React 17 atau sebelumnya)
    console.warn("Falling back to legacy ReactDOM.render(). Please check React/ReactDOM version.");
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      container
    );
  }
} else {
  console.error("Root container element with ID 'root' not found in index.html. Cannot render app.");
}
