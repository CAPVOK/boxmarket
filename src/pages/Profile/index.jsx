import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setLogin } from "../../core/slice";
import "./index.css"

function ProfilePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function clickButton () {
    dispatch(setLogin(false));
    navigate('/');
  }

  return (
    <div className="Profile">
      <h1>Comming soon</h1>
      <button onClick={clickButton}>Log out</button>
    </div>
  )
};

export { ProfilePage };
