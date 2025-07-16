import "./App.css";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <div>
        <img
          src="https://www.freeiconspng.com/thumbs/retail-store-icon/retail-store-icon-18.png"
          alt="store-png"
        />
      </div>
      <h1>Store Bro</h1>
      <div className="card"></div>

      <div className="Link-Route">
        <Link to="/Login">Sign in</Link>
        <br />
        <Link to="/register">Sign up</Link>
        <br />
        <Link to="/admin">Admin Page</Link>
        <br />
        <Link to="/buyer">Buyer page</Link>
        <br />
        <Link to="/seller">Seller Page</Link>

      </div>
    </>
  );
};

export default App;
