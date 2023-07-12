import {  Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Auth({ children }) {

  const location = useLocation();
  const auth = useSelector(state => state.todos.login);
  
  if (!auth) {
    return <Navigate to="/login" state={{from: location, prev: location.state?.from?.pathname}}/>
  }

  return children;
};

export { Auth };
