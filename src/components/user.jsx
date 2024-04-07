import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import queryString from 'query-string';

const User = () => {
  const params = useParams();
  const queries = queryString.parse(useLocation().search);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const name = useRef(null);
  console.log(queries);

  useEffect(() => {
    async function getUser() {
        try {
          const response = await axios.get(
            `https://reqres.in/api/users/${params.id}`
          );
          setUser(response.data.data);
        }
        catch(err) {
          navigate('/notFound');
        }
    }
    getUser();
  }, [params.id, navigate]);

  return (
    <>
      <div ref={name} className="card-header bg-primary text-white text-center">
        {user.first_name} {user.last_name}
      </div>
      <div className="card-body text-center">
        <img
          className="card-img-top"
          style={{ width: "100px", borderRadius: "50%" }}
          src={user.avatar}
          alt="Couldn't load."
        ></img>
        <div className="card-text">{user.email}</div>
      </div>
      <button onClick={()=>{navigate('/users')}} className="btn btn-dark rounded btn-lg m-3">Get back by push.</button>
      <button onClick={()=>{navigate('/users', {replace: true})}} className="btn btn-secondary rounded btn-lg m-3">Get back by replace.</button>
      <button onClick={handleNameChange} className="btn btn-danger rounded btn-lg m-3">Change the name to Morgh.</button>
    </>
    
  );

  function handleNameChange() {
    name.current.textContent = 'Morgh';
  }
};

export default User;
