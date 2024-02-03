import "./App.css";

// import Home from "./pages/Main";

import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";

function App() {
  return (  
      <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Signin" element={<Signin />} />
      </Routes>
        </Router>

  );
}

export default App;