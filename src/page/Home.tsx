import { useEffect, useState } from "react";
import { FaExchangeAlt, FaSearch } from "react-icons/fa";
import InputMask from "react-input-mask";
import { useParams } from "react-router-dom";
import Table from "../components/Table";
import useTransacoes from "../hooks/useTransacoes";
import {
  formatDateWithZone,
  formatarMoedaParaBrasil,
} from "../utils/funcoesUtils";
import { showError, showInfor } from "../utils/messages";
import { ValidarDuasDataInicioFim } from "../utils/validation";
import "./Home.css";

function Home() {
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [nomeTransacionado, setNomeTransacionado] = useState<string>("");

  let {
    transacoes,
    saldoTotal,
    saldoPeriodo,
    isLoading,
    getTransferenciasByNomeOperador,
    getSaldoTotalPorNumeroConta,
    getTransferenciasByNumeroConta,
    getTransferenciaPorTodosFiltros,
    getTransferenciasByPeriodo,
  } = useTransacoes();

  let { conta } = useParams();

  useEffect(() => {
    getTransferenciasByNumeroConta(conta || "0");
    getSaldoTotalPorNumeroConta(conta || "0");
  }, []);

  async function pesquisarTransacao() {
    const temTodosFiltros = dataFim && dataInicio && nomeTransacionado;

    const temSomenteNomeTransacionado =
      !dataFim && !dataInicio && nomeTransacionado;

    const temSomenteDataInicioEFim =
      dataFim && dataInicio && !nomeTransacionado;

    const seSomenteUmaDataTaPresente =
      (!dataFim && dataInicio) || (!dataInicio && dataFim);

    if (seSomenteUmaDataTaPresente) {
      return showInfor(
        "Para pesquisar um período digite a data inicio e data fim."
      );
    }

    if (temTodosFiltros) {
      let dtInicio: string = formatDateWithZone(dataInicio);
      let dtFim: string = formatDateWithZone(dataFim);

      let dataValidaErros = ValidarDuasDataInicioFim(dataInicio, dataFim);

      if (dataValidaErros.length > 0) {
        return showError(dataValidaErros[0]);
      }

      return getTransferenciaPorTodosFiltros(
        dtInicio,
        dtFim,
        nomeTransacionado,
        conta || "0"
      );
    }
    if (temSomenteNomeTransacionado) {
      return getTransferenciasByNomeOperador(nomeTransacionado, conta || "0");
    }
    if (temSomenteDataInicioEFim) {
      let dataValidaErros = ValidarDuasDataInicioFim(dataInicio, dataFim);

      if (dataValidaErros.length > 0) {
        return showError(dataValidaErros[0]);
      }

      let dtInicio: string = formatDateWithZone(dataInicio);
      let dtFim: string = formatDateWithZone(dataFim);

      return getTransferenciasByPeriodo(dtInicio, dtFim, conta || "0");
    }
    getTransferenciasByNumeroConta(conta || "");
  }

  return (
    <div className="main">
      <div className="card-transacao">
        <div
          style={{
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h1
            style={{
              flexDirection: "row",
              marginBottom: "1.5em",
              display: "flex",
            }}
          >
            Suas Transações
            <div style={{ marginLeft: "0.5em" }}>
              <FaExchangeAlt />
            </div>
          </h1>
        </div>

        <div className="input-form">
          <div className="form-group">
            <label htmlFor="dataInicio">
              <strong>Data de Início</strong>
            </label>
            <InputMask
              mask="99/99/9999"
              value={dataInicio}
              id="dataInicio"
              type="numeric"
              placeholder="Data de inicio"
              onChange={(event) => setDataInicio(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataFim">
              <strong>Data de Fim</strong>
            </label>
            <InputMask
              mask="99/99/9999"
              value={dataFim}
              id="dataFim"
              type="numeric"
              placeholder="Data de Fim"
              onChange={(event) => setDataFim(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nomeOperador">
              <strong>Nome do Transacionado</strong>
            </label>
            <input
              id="nomeOperador"
              type="text"
              placeholder="Nome do Transacionado"
              value={nomeTransacionado}
              onChange={(e) => setNomeTransacionado(e.target.value)}
            />
          </div>
        </div>

        <button onClick={() => pesquisarTransacao()} className="search-button">
          <div style={{ marginRight: "5%" }}>
            <FaSearch></FaSearch>
          </div>
          Pesquisar
        </button>
        <div className="balance">
          <div className="direction-balance">
            <div className="balance-item">
              <strong style={{ marginRight: "5px" }}>Saldo total: </strong>
              <p>{formatarMoedaParaBrasil(saldoTotal)}</p>
            </div>
            <div className="balance-item">
              <strong style={{ marginRight: "5px" }}>Saldo do Período: </strong>
              <p>{formatarMoedaParaBrasil(saldoPeriodo)}</p>
            </div>
          </div>
          <Table data={transacoes} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default Home;
