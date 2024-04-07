import { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import messageContext from '../contexts/oneTimeMessages';

class Navbar extends Component {
  static contextType = messageContext;

  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid justify-content-start">
            <Link to="/" className="navbar-brand">
              Home
            </Link>
            <NavLink to="/users" className={this.activeClassName}>
              Users
            </NavLink>
            {this.handleAuthentication()}
            <NavLink to="/feedback" className={this.activeClassName}>
              Feedback
            </NavLink>
          </div>
          <div className="d-block col-12">{this.props.children}</div>
        </nav>
      </>
    );
  }

  activeClassName = (navData) => {
    if (navData.isActive) {
      return "text-decoration-none navbar-item m-2 text-dark p-1 bg-white border border-secondary rounded";
    } else {
      return "text-decoration-none navbar-item m-2 text-white-50";
    }
  };

  handleAuthentication = () => {
    if (this.context.user) {
      return (
        <>
          <NavLink to="/dashboard" className={this.activeClassName}>
            Dashboard
          </NavLink>
          <NavLink to="/logout" className={this.activeClassName}>
            Logout
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/register" className={this.activeClassName}>
            Register
          </NavLink>
          <NavLink to="/login" className={this.activeClassName}>
            Login
          </NavLink>
        </>
      );
    }
  };
}

export default Navbar;
