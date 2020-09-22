import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils";
import * as yup from "yup";

export default function Register() {
  //state for login
  const [register, setRegister] = useState({
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
    setRegister({
      ...register,
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

  //toggles the submit button if form is valid
  useEffect(() => {
    formSchema.isValid(register).then((valid) => {
      setDisabled(!valid);
    });
  }, [register]);

  //submits valid form and resets it to blank
  const submitForm = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("api/auth/register ", register)
      .then((res) => {
        setPost(res.data);
        console.log("success!");
        //reset form
        setRegister({
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
      <h2>Let's Get You Signed Up</h2>
      <form onSubmit={submitForm}>
        <label htmlFor='username'>
          Username:
          <input
            name='username'
            id='username'
            type='username'
            value={register.username}
            onChange={onChange}></input>
          {errors.username.length > 0 ? <p>{errors.username}</p> : null}
        </label>
        <label htmlFor='password'>
          Password:
          <input
            name='password'
            id='password'
            type='password'
            value={register.password}
            onChange={onChange}></input>
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>
        <button disabled={disabled}>Submit</button>
      </form>
    </>
  );
}
