import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { Outlet , useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const noNavPaths = ["/login", "/register", "/reset"];

  return (
    <div className="layout">
      <div className="navbar">
        {!noNavPaths.includes(location.pathname) && <Navbar />}
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}

export default Layout;