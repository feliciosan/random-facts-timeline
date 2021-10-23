import React, { Fragment } from "react";
import Fact from "./components/fact";
import Generator from "./components/generator";
import { FactProvider } from "./contexts/fact";
import "./styles/app.scss";

const App = () => {
  return (
    <div className="app">
      <FactProvider>
        <Fragment>
          <Fact />
          <Generator />
        </Fragment>
      </FactProvider>
    </div>
  );
};

export default App;
