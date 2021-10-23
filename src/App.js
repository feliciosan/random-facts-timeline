import React from "react";
import { FactProvider } from "./contexts/fact";

const App = () => {
  return (
    <div className="app">
      <FactProvider>
        <h1>App</h1>
      </FactProvider>
    </div>
  );
};

export default App;
