import { useEffect, useState } from 'react';
import { converterDatasInicioFimParaSerValidoEmUrl, delayToLoading } from '../utils/funcoesUtils';
import { showError } from '../utils/messages';
import { getData } from '../utils/requisicoes';
import { formatarErrorResponse } from '../utils/requisiçoesUtils';

// Defina o tipo para as transações
type Transacao = {
  dataTransferencia: string;
  valor: string;
  tipo: string;
  nomeOperadorTransacao: string;
};


const useTransacoes = () => {

  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [saldoTotal, setSaldoTotal] = useState<number>(0.0);
  const [saldoPeriodo, setSaldoPeriodo] = useState<number>(0.0);

  const [codigoConta, setCodigoConta] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getSaldoPeriodo()
  }, [transacoes]);

  const getTodasTransferencias = async (): Promise<void> => {
    const url = '/transferencias';

    try {
      const transferenciasRetornadas: Transacao[] = await getData(url);
      setTransacoes(transferenciasRetornadas);
    } catch (error: any) {
      showError(formatarErrorResponse(error));

    }
    delayToLoading(1500, () => {
      setIsLoading(false);
    });
  };

  const getTransferenciasByNumeroConta = async (
    numeroConta: string
  ): Promise<void> => {
    setIsLoading(true);


    const url = `/transferencias/conta/${numeroConta}`;

    try {
      const transferenciasRetornadas: Transacao[] = await getData(url);
      setTransacoes(transferenciasRetornadas);

    } catch (error: any) {
      showError(formatarErrorResponse(error));
    }
    delayToLoading(1500, () => {
      setIsLoading(false);
    });
  };


  const getTransferenciasByPeriodo = async (
    dataInicio: string,
    dataFim: string,
    numeroConta: string
  ): Promise<void> => {
    setIsLoading(true);

    let url = converterDatasInicioFimParaSerValidoEmUrl(dataInicio, dataFim);

    const urlCompleto = `/transferencias/periodo${url}&numeroConta=${numeroConta}`;

    try {
      const transferenciasRetornadas: Transacao[] = await getData(urlCompleto);
      setTransacoes(transferenciasRetornadas);
    } catch (error: any) {
      showError(formatarErrorResponse(error));
    }

    delayToLoading(1000, () => {
      setIsLoading(false);
    });
  };

  const getTransferenciaPorTodosFiltros = async (
    dataInicio: string,
    dataFim: string,
    nomeTransacionado: string,
    numeroConta: string
  ): Promise<void> => {
    setIsLoading(true);

    let urlDatas = converterDatasInicioFimParaSerValidoEmUrl(dataInicio, dataFim);
    const urlCompleto = `/transferencias/todos-filtros${urlDatas}&nomeOperador=${nomeTransacionado}&numeroConta=${numeroConta}`;

    try {
      const transferenciasRetornadas: Transacao[] = await getData(urlCompleto);
      setTransacoes(transferenciasRetornadas);
    } catch (error: any) {
      showError(formatarErrorResponse(error));
    }

    delayToLoading(1000, () => {
      setIsLoading(false);
    });
  };

  const getTransferenciasByNomeOperador = async (
    nomeOperador: string,
    numeroConta: string
  ): Promise<void> => {
    setIsLoading(true);

    const url = `/transferencias/operador?nomeOperador=${nomeOperador}&numeroConta=${numeroConta}`;

    try {
      const transferenciasRetornadas: Transacao[] = await getData(url);
      setTransacoes(transferenciasRetornadas);
    } catch (error: any) {
      showError(formatarErrorResponse(error));
    }

    delayToLoading(1000, () => {
      setIsLoading(false);
    });
  };

  const getSaldoTotalPorNumeroConta = async (numeroConta: string): Promise<void> => {
    const url = `/transferencias/saldo-total/${numeroConta}`;

    try {
      var saldoTotalRetornado: number = await getData(url);

      if (saldoTotalRetornado == undefined) {
        saldoTotalRetornado = 0.0;
      }

      setSaldoTotal(saldoTotalRetornado);

    } catch (error: any) {
      setSaldoTotal(0.0)
      showError(formatarErrorResponse(error));
    }
  };

  const getSaldoPeriodo = async (): Promise<void> => {

    setSaldoPeriodo(0.0)

    if (!transacoes || transacoes.length == 0) {
      setSaldoPeriodo(0.0)
      return;
    }

    let sldPeriodo: number = 0.0;

    transacoes.map((transacao) => {
      sldPeriodo += parseFloat(transacao.valor);
    });
    setSaldoPeriodo(sldPeriodo);

  }

  return {
    transacoes,
    codigoConta,
    saldoPeriodo,
    saldoTotal,
    isLoading,
    setCodigoConta,
    getTodasTransferencias,
    getTransferenciasByNomeOperador,
    getTransferenciasByNumeroConta,
    getTransferenciasByPeriodo,
    getTransferenciaPorTodosFiltros,
    getSaldoTotalPorNumeroConta,
  };
};

export default useTransacoes;
