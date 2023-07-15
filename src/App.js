import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import DriverProfile from "./components/Driver/DriverProfile";

function App() {
  return (
   <div>
   <Router>
    <Routes>
      <Route path="/" element={<Hero/>} exact/>
      <Route path="/driver-profile" element={<DriverProfile/>} exact/>
    </Routes>
   </Router>
   </div>
  );
}

export default App;
