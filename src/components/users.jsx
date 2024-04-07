import { Component } from "react";
import axios from "axios";
import Loading from "./loading";
import { Link, Outlet } from "react-router-dom";

class Users extends Component {
  state = {
    users: [],
    isLoaded: false,
  };

  async componentDidMount() {
    let newUsers = [];
    for (let i = 0; i < 2; i++) {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${i + 1}&delay=2` // Using delay query of the API instead of setTimeout to show you the skeleton loading.
      );
      newUsers = [...newUsers, ...response.data.data];
    }
    this.setState({ users: newUsers, isLoaded: true });
  }

  render() {
    return this.loadingStatus();
  }

  loadingStatus = () => {
    if (this.state.isLoaded) {
      return (
        <>
          <div className="row justify-content-center">
            <button
              className="btn btn-lg btn-primary col-6 mt-2 mb-4"
              onClick={this.createUsers}
              type="button"
            >
              Create new user
            </button>
            <div className="bg-danger-subtle border border-black border-4 border-opacity-50 border-left-0 border-right-0 col-12">
              <Outlet />
            </div>
          </div>
          <div className="row justify-content-center">
            {this.state.users.map((user) => {
              return (
                <div className="card bg-primary-subtle col-2 border-black m-4" key={user.id}>
                  <div className="card-header bg-dark text-white text-center">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="card-body text-center">
                    <img
                      className="card-img-top"
                      style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                      src={user.avatar}
                      alt="Couldn't load."
                    ></img>
                    <div className="card-text">{user.email}</div>
                  </div>
                  <div className="card-footer btn-group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        this.editUser(user);
                      }}
                    >
                      Edit user
                    </button>
                    <Link to={`/users/${user.id}`} className="btn btn-info">
                      Show user
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        this.deleteUser(user);
                      }}
                    >
                      Delete user
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return <Loading />;
    }
  };

  createUsers = async () => {
    const names = ["john", "jack", "anna", "steve", "josh"];
    const lastNames = ["hallow", "evans", "maximus", "white", "linger"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const avatarUrl = `https://picsum.photos/id/${Math.floor(
      Math.random() * 100
    )}/200`;
    const emailAdd = `${randomName}.${randomLastName}@gmail.com`;
    const newUser = {
      first_name: randomName,
      last_name: randomLastName,
      email: emailAdd,
      avatar: avatarUrl,
    };
    const response = await axios.post("https://reqres.in/api/users", newUser);
    this.setState({ users: [...this.state.users, response.data] });
  };

  editUser = async (user) => {
    const newNames = [
      "john",
      "jack",
      "anna",
      "steve",
      "josh",
      "alex",
      "ammanda",
      "rose",
      "milad",
    ];
    user.first_name = newNames[Math.floor(Math.random() * newNames.length)];
    const response = await axios.put(
      `https://reqres.in/api/users/${user.id}`,
      user
    );
    console.log(response);
    const newUsers = this.state.users;
    const index = newUsers.findIndex((u) => u.id === user.id);
    newUsers[index] = user;
    this.setState({ users: newUsers });
  };

  deleteUser = async (user) => {
    const response = await axios.delete(
      `https://reqres.in/api/users/${user.id}`
    );
    console.log(response);
    const newUsers = this.state.users.filter((u) => u.id !== user.id);
    this.setState({ users: newUsers });
  };
}

export default Users;
