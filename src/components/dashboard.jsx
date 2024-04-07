import messageContext from "../contexts/oneTimeMessages";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

axios.defaults.headers.common['token'] = localStorage.getItem('token');

const Dashboard = () => {
  const context = useContext(messageContext);
  const [data, setData] = useState(null);

  if (!context.user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <div className="container-fluid text-center bg-dark text-white p-2">
        <h1>Dashboard</h1>
        <button onClick={handleGetData} className="btn btn-primary m-2">Send random request.</button>
        {data && (
          <>
            <div className="bg-white container-fluid text-dark border border-5 border-top-0 border-opacity-50 border-danger">
              <h2 style={{color: `${data.color}`}}>{data.name}</h2>
              <p>{data.year}</p>
              <p>{data.pantone_value}</p>
            </div>
          </>
        )}
      </div>
    </>
  );

  async function handleGetData() {
    const response = await axios.get("https://reqres.in/api/unknown/2");
    setData(response.data.data);
  }
};

export default Dashboard;
