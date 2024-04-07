import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import messageContext from "../contexts/oneTimeMessages";

const Logout = () => {
  const navigate = useNavigate();
  const context = useContext(messageContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      context.setStateValues(null, "user");
      context.setStateValues(true, "showOTP");
      context.setStateValues("Log out successful.", "message");
      context.setStateValues("success", "type");
    }
    navigate("/", { replace: true });
  }, [navigate, context]);

  return null;
};

export default Logout;
