import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Conta from "./page/Conta/Conta";
import Page404 from "./page/404/Page404";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Conta />} />
      <Route path="/conta/:conta" element={<Home />} />
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
}

export default Rotas;
