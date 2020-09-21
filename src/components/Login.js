import React, { useState } from "react";
import * as yup from "yup";

export default function Login() {
  //state for login
  const [login, setLogin] = useState({
    name: "",
    password: "",
  });

  //state for errors
  const [errors, setErrors] = useState({
    name: "",
    password: "",
  });

  const onChange = (e) => {
    e.persist();
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    validateChange(e);
  };

  const formSchema = yup.object().shape({
    name: yup.string().min(2).required("must have at least 2 characters"),
    password: yup.string().min(6).required("must have at least 6 characters"),
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
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
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
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
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>
      </form>
    </>
  );
}
