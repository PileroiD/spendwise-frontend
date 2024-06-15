import axios from "axios";

const instance = axios.create({
	// baseURL: process.env.DEVELOPMENT_API,
	baseURL: "http://localhost:4444/api",
	withCredentials: true,
});

export default instance;
