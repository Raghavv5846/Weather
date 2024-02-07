import "./App.css";

// import Home from "./pages/Main";

import { Route, Routes, } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Users from "./screens/Users";

function App() {
  return (  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Users" element={<Users />} />
      </Routes>

  );
}

export default App;