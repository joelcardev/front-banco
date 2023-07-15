import moment from "moment";

export function ValidarDuasDataInicioFim(dataInicio: string, dataFim: string) {

    debugger
    let erros: string[] = [];

    const dtInicio = moment(dataInicio, 'DD/MM/YYYY', true);
    const dtFim = moment(dataFim, 'DD/MM/YYYY', true);
    const dataAtual = moment();

    if (dtInicio > dtFim) {
        erros.push("Data inicio não pode ser maior que a final.")
    }
    if (dtFim > dataAtual) {
        erros.push("Data final não pode ser maior que a data atual.")
    }
    return erros;
}
