import "./App.css";
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";

import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Users from "./screens/Users";

function App() {
  return (  
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Signin" element={<Signin />} />
        <Route exact path="/Users" element={<Users />} />
      </Routes>
    </Router>

  );
}

export default App;