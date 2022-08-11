import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import axios from "axios";

async function App() {
  const { data } = await axios.get("http://localhost:3000/houses");
  console.log(data);
  return (
    <Router className="App">
      <NavBar />
    </Router>
  );
}

export default App;
