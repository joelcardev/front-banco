import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showError = (message: string) => {
    toast.error(message);
};

export const showSuccess = (message: string) => {
    toast.success(message);
};

export const showInfor = (message: string) => {
    toast.info(message);
};
