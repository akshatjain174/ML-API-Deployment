import { Link } from "react-router-dom";
import "../styles.css";


function Navbar() {
  return (
    <nav className="navbar">
      <h1>SickSense</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/predict/heart">Heart</Link>
        <Link to="/predict/diabetes">Diabetes</Link>
        <Link to="/predict/liver">Liver</Link>
      </div>
    </nav>
  );
}

export default Navbar;
