import { Link, useLocation, Outlet, } from "react-router-dom";
import "./index.css";

function Nav() {
  const location = useLocation();
  
  return (
    <div >
      <div className="Nav">
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/" className="icon"><ion-icon name="home-outline"></ion-icon></Link>
          </li>
          <li className={location.pathname.slice(0, 9) === "/products" ? "active" : ""}>
            <Link to="/products" className="icon"><ion-icon name="bag-handle-outline"></ion-icon></Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile" className="icon"><ion-icon name="person-outline"></ion-icon></Link>
          </li>
          <li className="slider"><div></div></li>
        </ul>
      </div>

      <Outlet />

    </div>
  )
};

export { Nav };
