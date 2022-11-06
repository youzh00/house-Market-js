import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import ProfileScreen from "./Screens/ProfileScreen";
import HomeScreen from "./Screens/HomeScreen";
import {LoginScreen} from './Screens/LoginScreen'
import RegisterScreen from "./Screens/RegisterScreen";
import RequireAuth from "./features/auth/RequiredAuth";
import HousesListScreen from "./Screens/HousesListScreen";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import HouseDetailsScreen from "./Screens/HouseDetailsScreen";

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route path='/welcome' element={<HomeScreen />} />
              <Route path="/houses" element={<HousesListScreen />} />
              <Route path="/houses/:id" element={<HouseDetailsScreen />} />

              
              <Route path="/auth/login" element={<LoginScreen />} />
              <Route path="/auth/register" element={<RegisterScreen />} />


              {/* Protected Routes */}
              <Route element={<PersistLogin />}>
              
                <Route element={<RequireAuth/>}>
                  <Route path="/me/profile" element={<ProfileScreen />} />
                </Route>
              
              </Route>
        

        </Route>
      </Routes>
    </>
  );
}

export default App;
