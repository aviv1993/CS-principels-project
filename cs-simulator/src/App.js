import React from "react";
import Layout from "./Comp/Layout/Layout";
import ArrayControler from "./Containers/ArrayController/ArrayControler";
import GraphController from "./Containers/GraphController/GraphController";
import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/" exact component={ArrayControler} />
        <Route path="/graph-controller" exact component={GraphController} />
        <Route path="/about-me" exact component={GraphController} />
      </Layout>
    </div>
  );
}

export default App;
