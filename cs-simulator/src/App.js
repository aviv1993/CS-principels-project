import React from "react";
import Layout from "./Comp/Layout/Layout";
import ArrayControler from "./Containers/ArrayController/ArrayControler";
import GraphController from "./Containers/GraphController/GraphController";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Layout>
        {/*<ArrayControler />*/}
        {<GraphController />}
      </Layout>
    </div>
  );
}

export default App;
