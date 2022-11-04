import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import ProfileScreen from "./Screens/ProfileScreen";
import HomeScreen from "./Screens/HomeScreen";
import {LoginScreen} from './Screens/LoginScreen'
import RegisterScreen from "./Screens/RegisterScreen";
import RequireAuth from "./features/auth/RequiredAuth";

function App() {
  // const { data } = await axios.get("http://localhost:3000/houses");
  // console.log(data);
  return (
    <>
      <Router>
        <Header />
        <Routes>

              <Route path='/' element={<HomeScreen />} />
              <Route path="/auth/login" element={<LoginScreen />} />
              <Route path="/auth/register" element={<RegisterScreen />} />

              <Route element={<RequireAuth/>}>
                <Route path="/user/profile" element={<ProfileScreen />} />
              </Route>
        

        </Routes>
        
        {/* <NavBar /> */}
      </Router>
    </>
  );
}

export default App;
