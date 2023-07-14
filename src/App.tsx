import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Rotas from "./Rotas";
import AppBar from "./components/AppBar/AppBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppBar />
        <Rotas />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
