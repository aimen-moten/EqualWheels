import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import DriverProfile from "./components/Driver/DriverProfile";
import DriverAcceptedRides from "./components/Driver/DriverAcceptedRides";
import DriverEarnings from "./components/Driver/DriverEarnings";
import DriverHeader from "./components/Driver/DriverHeader";
import DriverHome from "./components/Driver/DriverHome";
import DriverNotifications from "./components/Driver/DriverNotifications";
import DriverRideHistory from "./components/Driver/DriverRideHistory";
import DriverRideRequests from "./components/Driver/DriverRideRequests";
import RideDetails from "./components/Rider/RideDetails";
import RideRequestForm from "./components/Rider/RideRequestForm";
import RiderHeader from "./components/Rider/RiderHeader";
import RiderHome from "./components/Rider/RiderHome";
import RiderNotifications from "./components/Rider/RiderNotifications";
import RiderPayments from "./components/Rider/RiderPayments";
import RiderProfile from "./components/Rider/RiderProfile";
import RiderRideHistory from "./components/Rider/RiderRideHistory";
import Error from "./components/Error";
import Footer from "./components/Footer";
import RideRequestPage from "./components/Rider/RideRequestPage";
import Submitted from "./components/Rider/Submitted";

function App() {
  return (
   <div>
   <Router>
    <Routes>
      <Route path="/" element={<Hero/>} exact/>
      {/* driver */}
      <Route path="/driver-profile" element={<DriverProfile/>} exact/>
      <Route path="/driver-accepted-rides" element={<DriverAcceptedRides/>} exact/>
      <Route path="/driver-earnings" element={<DriverEarnings/>} exact/>
      <Route path="/driver-header" element={<DriverHeader/>} exact/>
      <Route path="/driver-home" element={<DriverHome/>} exact/>
      <Route path="/driver-notifications" element={<DriverNotifications/>} exact/>
      <Route path="/driver-profile" element={<DriverProfile/>} exact/>
      <Route path="/driver-ride-history" element={<DriverRideHistory/>} exact/>
      <Route path="/driver-ride-requests" element={<DriverRideRequests/>} exact/>
      {/* rider */}
      <Route path="/rider-details" element={<RideDetails/>} exact/>
      <Route path="/rider-request-form" element={<RideRequestPage/>} exact/>
      <Route path="/rider-header" element={<RiderHeader/>} exact/>
      <Route path="/rider-home" element={<RiderHome/>} exact/>
      <Route path="/rider-notifications" element={<RiderNotifications/>} exact/>
      <Route path="/rider-payments" element={<RiderPayments/>} exact/>
      <Route path="/rider-profile" element={<RiderProfile/>} exact/>
      <Route path="/rider-history" element={<RiderRideHistory/>} exact/>
      <Route path="/submitted" element={<Submitted/>} exact/>      
      {/* 404 */}
      <Route path="*" element={<Error/>} />
    </Routes>
    <div>
      <Footer/>
    </div>
   </Router>
   </div>
  );
}

export default App;
