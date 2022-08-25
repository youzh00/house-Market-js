import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Header } from "./components/Header";
import ProfileScreen from "./Screens/Profile.screen";

function App() {
  // const { data } = await axios.get("http://localhost:3000/houses");
  // console.log(data);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/user/profile" element={<ProfileScreen />} />
        </Routes>
        {/* <NavBar /> */}
      </Router>
    </>
  );
}

export default App;
