import axios from "./axios";

export const request = async (url, method, data) => {
    return await axios(url, {
        method,
        headers: {
            "Content-type": "application/json",
        },
        data: data ? JSON.stringify(data) : undefined,
    })
        .then((res) => res.data)
        .catch((error) => {
            return error;
        });
};
