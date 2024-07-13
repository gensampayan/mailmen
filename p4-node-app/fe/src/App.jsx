import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mailbox from "./pages/Mailbox";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mailbox" element={<Mailbox />} />
    </Routes>
  )
}

export default App;
