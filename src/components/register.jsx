import axios from "axios";
import { Component } from "react";
import messageContext from "../contexts/oneTimeMessages";
import { Navigate } from "react-router-dom";

/*
  The register part doesn't have validation.
*/

class Register extends Component {
  static contextType = messageContext;
  state = {
    registerSuccess: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);
    try {
      const response = await axios.post("https://reqres.in/api/register", user);
      console.log(response);
      this.context.setStateValues(true, "showOTP");
      this.context.setStateValues(
        `User ${this.state.firstName} ${this.state.lastName} registered successfully.`,
        "message"
      );
      this.context.setStateValues("success", "type");
      this.setState({ registerSuccess: true });
    } catch (err) {
      this.context.setStateValues(true, "showOTP");
      this.context.setStateValues(`Email or password was invalid.`, "message");
      this.context.setStateValues("warning", "type");
    }
  };

  handleChange = (e) => {
    const input = e.currentTarget;
    const newState = { ...this.state };
    newState[input.name] = input.value;
    this.setState(newState);
  };

  render() {
    if (this.state.registerSuccess) {
      return <Navigate to="/users" />;
    }

    return (
      <>
        {
          // It is better to make a component out of input fields and use that component instead.
          // We just use the simple method because implementing that is clear.
        }
        <form onSubmit={this.handleSubmit} className="bg-secondary">
          <div className="col-6 m-3 mt-0">
            <label htmlFor="fname" className="mt-2 mb-2">
              First Name:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.firstName}
              name="firstName"
              id="fname"
              type="text"
              placeholder="John"
              className="form-control"
            ></input>
          </div>
          <div className="col-6 m-3 mt-0">
            <label htmlFor="lname" className="mt-2 mb-2">
              Last Name:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.lastName}
              name="lastName"
              id="lname"
              type="text"
              placeholder="Wick"
              className="form-control"
            ></input>
          </div>
          <div className="col-6 m-3 mt-0">
            <label htmlFor="email" className="mt-2 mb-2">
              Email:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              name="email"
              id="email"
              type="text"
              placeholder="john.wick@example.in"
              className="form-control"
            ></input>
          </div>
          <div className="col-6 m-3 mt-0">
            <label htmlFor="password" className="mt-2 mb-2">
              Password:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
              id="password"
              type="text"
              className="form-control"
            ></input>
          </div>
          <button type="submit" className="btn btn-outline-info m-3">
            Register
          </button>
        </form>
      </>
    );
  }
}

export default Register;
