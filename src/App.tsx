import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Store Bro</h1>
      <div className="card"></div>

      <div className="Link-Route">
        <Link to="/Login">Sign in</Link>
        <br />
        <Link to="/register">Sign up</Link>
      </div>
    </>
  );
};

export default App;
