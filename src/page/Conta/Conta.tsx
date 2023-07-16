import { useNavigate } from "react-router-dom";
import useTransacoes from "../../hooks/useTransacoes";
import { justNumber } from "../../utils/funcoesUtils";
import { showInfor } from "../../utils/messages";
import "./Conta.css";

function Conta() {


  let {codigoConta, setCodigoConta} = useTransacoes();

  let navigate = useNavigate();

  function entrarEmTransacoes(codigoConta: string) {
    if (!codigoConta) {
      return showInfor("Digite unm codigo da conta");
    }
    navigate(`/conta/${codigoConta}`);
  }

  return (
    <div className="conta-main">
      <div className="card">
        <h1>Olá, cliente!</h1>
        <h2>Digite o código da sua conta</h2>
        <input
          type="text"
          className="codigo-conta-input"
          placeholder="Código da conta"
          value={codigoConta}
          onChange={(e) => setCodigoConta(justNumber(e.target.value))}
        />
        <button
          className="entrar-button"
          type="button"
          onClick={() => entrarEmTransacoes(codigoConta)}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Conta;
