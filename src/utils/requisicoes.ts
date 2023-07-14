import axios, { AxiosResponse } from 'axios';
import { showError } from './messages';
import { formatarErrorResponse } from './requisiçoesUtils';

interface ApiResponse {
    dados: string;
    valentia: string;
    tipo: string;
    nomeTransicionado: string;
}

export const getData = async (
    url: String,
): Promise<any> => {

    let urlCompleto = "http://localhost:8080" + url

    try {
        const response: AxiosResponse<ApiResponse[]> = await axios.get(urlCompleto);
        return response.data;
    } catch (error: any) {
        showError(formatarErrorResponse(error));
    }
};
