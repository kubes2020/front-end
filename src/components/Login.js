import React, { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState({
    name: "",
    password: "",
  });

  const onChange = (e) => {
    e.persist();
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Let's Get Signed Up!</h2>
      <form>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            id="name"
            type="text"
            value={login.name}
            onChange={onChange}
          ></input>
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            id="password"
            type="password"
            value={login.password}
            onChange={onChange}
          ></input>
        </label>
      </form>
    </>
  );
}
