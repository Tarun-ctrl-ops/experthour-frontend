import { Outlet, Link } from "react-router-dom";
import "../styles/global.css";
import { logout } from "../utils/auth";

export default function AppLayout() {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="logo">ExpertHour</div>
          <nav className="nav">
            <Link to="/experts">Experts</Link>
            <Link to="/availability">Availability</Link>
            <Link to="/book">Book</Link>
            <button onClick={logout}>Logout</button>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}





