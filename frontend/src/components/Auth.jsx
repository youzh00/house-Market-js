import Register from "./Register";
import Login from "./Login";

export default function Auth({ type, toggle, setTitle }) {
  return (
    <>
      {type === "register" ? (
        <Register toggle={toggle} setTitle={setTitle} />
      ) : (
        <Login toggle={toggle} setTitle={setTitle} />
    )} 
    </>
  );
}
