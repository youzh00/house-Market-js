import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Header } from "./components/Header";

function App() {
  // const { data } = await axios.get("http://localhost:3000/houses");
  // console.log(data);
  return (
    <>
      <Header />

      {/* <NavBar /> */}
    </>
  );
}

export default App;
