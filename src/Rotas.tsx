import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Conta from "./page/Conta/Conta";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Conta />} />
      <Route path="/conta/:conta" element={<Home />} />
    </Routes>
  );
}

export default Rotas;
