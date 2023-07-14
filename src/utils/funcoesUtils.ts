import moment from 'moment';

export function delayToLoading(time: number, callback: () => void): void {
  setTimeout(function () {
    callback();
  }, time);
}


export function formatDateWithZone(dateStr: string): string {
  const date = moment(dateStr);
  const formattedDate = date.format('YYYY-MM-DD HH:mm:ss Z');
  return formattedDate;
}


export function formatDateNormal(dateStr: string): string {
  const date = moment.unix(parseFloat(dateStr));
  const formattedDate = date.format('DD-MM-YYYY');
  return formattedDate;
}


export function converterDatasInicioFimParaSerValidoEmUrl(dataInicio: string, dataFim: string) {
  let url = `?dataInicio=${encodeURIComponent(dataInicio)}&dataFim=${encodeURIComponent(dataFim)}`;
  return url;
}

export function justNumber(value: string): string {
  const numeros = value.replace(/\D/g, ''); // Filtrar apenas números

  return numeros;
}

export function getContaPorParamsUrl() {
  debugger
  const searchParams = window.location.pathname;
  const parts = searchParams.split("/");
  const valor = parts[parts.length - 1];
  return valor;
}
