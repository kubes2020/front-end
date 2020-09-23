import React from "react";
import Register from "./components/Register";
import { Route, NavLink, Switch } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
      <section className="form-container">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Register />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
