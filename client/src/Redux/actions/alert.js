import { SET_ALERT, REMOVE_ALERT } from './types'
// import { v4 as uuid } from "uuid";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export const successToast = (msg) => (dispatch) => {


    dispatch({
        type: SET_ALERT,
        payload: msg
    }
    );
    toast.success(msg);

}

export const errorToast = (msg) => (dispatch) => {



    dispatch(
        {
            type: REMOVE_ALERT,
            payload: msg
        }
    );
    toast.error(msg);

}
