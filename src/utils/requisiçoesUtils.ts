
interface ErrorType {
  code?: string;
  response?: {
    data?: {
      name?: string;
      errors?: string;
      mensagens?: string;
      mensagem?: string;
    };
  };
}


export function formatarErrorResponse(erro: ErrorType): string {
  if (erro && erro.code === "ERR_NETWORK") {
    return "Serviço fora do ar, tente novamente mais tarde.";
  }

  if (
    erro.response &&
    erro.response.data &&
    "errors" in erro.response.data &&
    erro.response.data.errors !== null
  ) {
    return erro.response.data.errors || "";
  }

  if (
    erro.response &&
    erro.response.data &&
    "mensagens" in erro.response.data &&
    erro.response.data.mensagens !== null
  ) {
    return erro.response.data.mensagens || "";
  }

  if (
    erro.response &&
    erro.response.data &&
    "mensagem" in erro.response.data &&
    erro.response.data.mensagem !== null
  ) {
    return erro.response.data.mensagem || "";
  }

  return "";
}
