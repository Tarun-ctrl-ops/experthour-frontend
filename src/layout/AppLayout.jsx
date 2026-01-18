import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/signup">Signup</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/experts">Experts</Link> |{" "}
        <Link to="/availability">Availability</Link> |{" "}
        <Link to="/book">Book</Link>
      </nav>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}
