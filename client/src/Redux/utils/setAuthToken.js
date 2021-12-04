
import axios from 'axios'

const setAuthToken = (token) => {

    if (token) {
        axios.defaults.headers.common['x-auth-webToken'] = token;
    }
    else {
        delete axios.defaults.headers.common['x-auth-webToken'];
    }

}

export default setAuthToken
