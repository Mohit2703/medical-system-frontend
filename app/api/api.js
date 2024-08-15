import axios from "axios";

const APICall = async(method, body, endpoint, authReq) => {
    const base = "http://127.0.0.1:8000/api/";
    const url = base + endpoint;
    const Token = window.localStorage.getItem("token");

    // console.log(Token);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': authReq ? "Token " + Token : '',
    }

    console.log(headers);

    if (method === 'POST') {
        return await axios.post(url, body, { headers }).then((res) => {
            return res;
        }).catch((err) => {
            if (err.status === 401) {
                console.log('Unauthorized');
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');
                window.location.reload();
            }
            console.log("Error: ", err);
            return err;
        })
    } else if (method === 'GET') {
        return await axios.get(url, { headers }).then((res) => {
            console.log("GET DATA: ", res);
            return res;
        }).catch((err) => {
            if (err.status === 401) {
                console.log('Unauthorized');
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');
                window.location.reload();
            }
            console.log("Error: ", err);
            return err;
        })
    }
}

export { APICall }