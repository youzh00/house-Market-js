import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Header } from "./components/Header";
import ProfileScreen from "./Screens/Profile.screen";
import HomeScreen from "./Screens/Home.screen";
import {AuthenticationImage} from './features/auth/Login2'
import Register from "./features/auth/Register";

function App() {
  // const { data } = await axios.get("http://localhost:3000/houses");
  // console.log(data);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/user/profile" element={<ProfileScreen />} />
          <Route path="/auth/login" element={<AuthenticationImage />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
        
        {/* <NavBar /> */}
      </Router>
    </>
  );
}

export default App;
