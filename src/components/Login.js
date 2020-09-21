import Axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

export default function Login() {
  //state for login
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  //state for errors
  const [errors, setErrors] = useState({
    email: "",
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
    email: yup.string().email().required("must have a valid email"),
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

  useEffect(() => {
    formSchema.isValid(login).then((valid) => {
      setDisabled(!valid);
    });
  }, [login]);

  const submitForm = (e) => {
    e.preventDefault();
    Axios.post("https://reqres.in/api/users", login)
      .then((res) => {
        setPost(res.data);
        console.log("success!");
        //reset form
        setLogin({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log("there was an error", err);
      });
  };

  return (
    <>
      <h2>Let's Get Logged In!</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            id="email"
            type="email"
            value={login.email}
            onChange={onChange}
          ></input>
          {errors.email.length > 0 ? <p>{errors.email}</p> : null}
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
