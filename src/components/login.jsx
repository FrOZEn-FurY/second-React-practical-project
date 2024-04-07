import axios from "axios";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import messageContext from "../contexts/oneTimeMessages";
import * as yup from "yup";

/*
  The login part has validation.
*/


const Login = () => {
  const [state, setState] = useState({
    loginSuccess: false,
    sendingData: false,
    errors: [],
  });
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const context = useContext(messageContext);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email address is not valid.")
      .required("Email is required."),
    password: yup
      .string()
      .min(8, "Password must at least be 8 characters"),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({...state, errors: []})
    let user;
    try {
      setState({...state, sendingData: true });
      user = await schema.validate(
        {
          email: email.current.value,
          password: password.current.value,
        },
        { abortEarly: false }
      );
      setState({...state, sendingData: false });
    } catch (err) {
      setState({...state, sendingData: false });
      setState({...state, errors: err.errors });
      return;
    }
    try {
      setState({...state, sendingData: true });
      const response = await axios.post("https://reqres.in/api/login", user);
      localStorage.setItem("token", response.data.token);
      setState({...state, sendingData: false, loginSuccess: true });
    } catch (err) {
      setState({...state, sendingData: false });
      context.setStateValues(true, "showOTP");
      context.setStateValues("User not found.", "message");
      context.setStateValues("danger", "type");
      return;
    }
  }

  function render() {
    if (state.loginSuccess) {
      context.setStateValues(true, "showOTP");
      context.setStateValues("Login success.", "message");
      context.setStateValues("success", "type");
      const token = localStorage.getItem("token");
      if (token) {
      // const response = axios.post('https://reqres.in/api/getuserbytoken', token); // But because API and token is fake, we make our own user.
      const response = {
        data: {
          user: {
            first_name: "John",
            last_name: "Doe",
            email: "fakeuser@example.com",
          }
        }
      }
      if (response.data.user) {
        context.setStateValues(response.data.user, "user");
      }
    }
      navigate("/dashboard", { replace: true });
    }

    console.log(state);

    return (
      <>
        {
          // It is better to make a component out of input fields and use that component instead.
          // We just use the simple method because implementing that is clear.
        }
        <form onSubmit={handleSubmit} className="bg-secondary mt-0">
          {state.errors.length !== 0 && (
            <div className="alert alert-warning">
              <ul>
                {state.errors.map((err, ind) => {
                  return <li key={ind}>{err}</li>;
                })}
              </ul>
            </div>
          )}
          <div className="m-3 mt-0 col-6">
            <label className="mb-2 mt-2" htmlFor="email">
              Email:{" "}
            </label>
            <input
              ref={email}
              id="email"
              type="text"
              className="form-control"
              placeholder="fakeuser@example.com"
            ></input>
          </div>
          <div className="m-3 col-6">
            <label className="mb-2 mt-2" htmlFor="password">
              Password:{" "}
            </label>
            <input
              ref={password}
              id="password"
              type="text"
              className="form-control"
            ></input>
          </div>
          <button disabled={state.sendingData} type="submit" className="btn btn-info m-3 col-1">
            Login
          </button>
        </form>
      </>
    );
  }
  return render();
};

export default Login;
