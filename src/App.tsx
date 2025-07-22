import "./App.css";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="logo-wrapper">
        <img
          src="https://www.freeiconspng.com/thumbs/retail-store-icon/retail-store-icon-18.png"
          alt="store-png"
          className="store-logo"
        />
      </div>
      <h1 className="app-title">Store Bro</h1>

      <div className="link-route">
        <Link to="/Login" className="btn-link">
          Sign in
        </Link>
        <Link to="/register" className="btn-link">
          Sign up
        </Link>
        {/* 
        <Link to="/admin" className="btn-link">Admin Page</Link>
        <Link to="/buyer" className="btn-link">Buyer page</Link>
        <Link to="/seller" className="btn-link">Seller Page</Link> 
        */}
      </div>
    </div>
  );
};

export default App;
