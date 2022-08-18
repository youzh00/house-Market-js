import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Header } from "./components/Header";
import axios from "axios";
import { Image } from "@mantine/core";

function App() {
  // const { data } = await axios.get("http://localhost:3000/houses");
  // console.log(data);
  return (
    <>
      <Header />
      {/* <Image
        radius="md"
        src={require("/profilePics/sample.png")}
        alt="Random unsplash image"
      /> */}
      {/* <NavBar /> */}
    </>
  );
}

export default App;
