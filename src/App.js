import React from "react";
import Login from "./components/Login";
import { Route, Link, Switch } from "react-router-dom";
import ExistingLogin from "./components/ExistingLogin";

function App() {
  return (
    <div className="App">
      <Link to="/">Login</Link>
      <h1>Hello</h1>
      <Switch>
        <Route path="/existing">
          <ExistingLogin />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
