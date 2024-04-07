import { Component } from "react";
import Users from "./components/users";
import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home";
import OTMessage from "./components/oneTimeMessage";
import User from "./components/user";
import NotFound from "./components/notFound";
import Dashboard from "./components/dashboard";
import Feedback from "./components/feedback";
import Logout from "./components/logout";
import { Route, Routes, Navigate } from "react-router-dom";
import messageContext from "./contexts/oneTimeMessages";

class App extends Component {
  state = {
    showOTP: false,
    message: "",
    type: "",
    user: null,
  };

  setStateValues = (value, which) => {
    if (which === "showOTP") {
      this.setState({ showOTP: value });
    }
    if (which === "message") {
      this.setState({ message: value });
    }
    if (which === "type") {
      this.setState({ type: value });
    }
    if (which === "user") {
      this.setState({ user: value });
    }
  };

  handleCloseOTM = () => {
    this.setState({ showOTP: false });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    // const response = axios.post('https://reqres.in/api/getuserbytoken', token); // But because API and token is fake, we make our own user.
    // We declare the user here again, because new requests and refresh cause the initial stage.
    const response = {
      data: {
        data: {
          first_name: "John",
          last_name: "Doe",
          email: "I8ZlA@example.com",
        },
      },
    };
    if (!response.data.data) {
      return;
    }
    this.setState({ user: response.data.data });
  }
  render() {
    return (
      <>
        <messageContext.Provider
          value={{
            showOTP: this.state.showOTP,
            message: this.state.message,
            type: this.state.type,
            user: this.state.user,
            setStateValues: this.setStateValues,
          }}
        >
          <Navbar>
            {this.state.showOTP && (
              <OTMessage
                alertType={this.state.type}
                closeAlert={this.handleCloseOTM}
              >
                {this.state.message}
              </OTMessage>
            )}
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />}>
              <Route path=":id" element={<User />} />
            </Route>
            <Route path="/customers" element={<Navigate to="/users" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/notFound" />} />
            {
              // I just wanted to use Navigate components :)
              // Instead of the last line for redirecting invalid urls:
              // <Route path="*" element={<NotFound />}/>
              // And we didn't need a Route for notFound url.
            }
          </Routes>
        </messageContext.Provider>
      </>
    );
  }
}

export default App;
