
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

export default function reducer(state = initialState, action) {

    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return [...state, payload];;

        default:
            return state;
    }
}