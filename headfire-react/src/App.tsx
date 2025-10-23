import React from "react";
import { Button } from "./components/Button/Button";

export function App() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ display: "grid", gap: 12, minWidth: 320 }}>
        <h1 className="hf-typography hf-typography--title">Headfire + React</h1>
        <p className="hf-typography hf-typography--body">
          Hello world styled with component DSL and themed via Headfire. Resize
          to see responsive padding.
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <Button>Primary Action</Button>
          <Button data-hf-theme-toggle>Toggle Theme</Button>
        </div>
        <div className="hf-card" style={{ marginTop: 8 }}>
          I am a card using DSL styles.
        </div>
      </div>
    </div>
  );
}
