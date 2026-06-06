import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Signup from "./page/Signup.jsx"
import Login from "./page/Login.jsx";


function App() {
    return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login/>}/>

    </Routes>
  );


}

export default App;