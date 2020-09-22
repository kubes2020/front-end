import Axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

export default function Login() {
  //state for login
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  //state for errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  //state for axios post
  const [post, setPost] = useState([]);

  //state for disabled submit button
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    e.persist();
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    validateChange(e);
  };

  const formSchema = yup.object().shape({
    username: yup.string().min(4).required("must have at least 4 characters"),
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

  //toggles the submit button if form is valid
  useEffect(() => {
    formSchema.isValid(login).then((valid) => {
      setDisabled(!valid);
    });
  }, [login]);

  //submits valid form and resets it to blank
  const submitForm = (e) => {
    e.preventDefault();
    Axios.post("https://reqres.in/api/users", login)
      .then((res) => {
        setPost(res.data);
        console.log("success!");
        //reset form
        setLogin({
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log("there was an error", err);
      });
  };

  return (
    <>
      <h2>Welcome Back!</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="username">
          Username:
          <input
            name="username"
            id="username"
            type="text"
            value={login.username}
            onChange={onChange}
          ></input>
          {errors.username.length > 0 ? <p>{errors.username}</p> : null}
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
        <button disabled={disabled}>Submit</button>
      </form>
    </>
  );
}
