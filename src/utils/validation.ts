export function ValidarDuasDataInicioFim(dataInicio: string, dataFim: string) {

    let erros: string[] = [];

    const dtInicio = new Date(dataInicio);
    const dtFim = new Date(dataFim);
    const dataAtual = new Date();

    if (dtInicio > dtFim) {
        erros.push("Data inicio não pode ser maior que a final.")
    }
    if (dtFim > dataAtual) {
        erros.push("Data final não pode ser maior que a data atual.")
    }
    return erros;
}
