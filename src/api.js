import axios from "axios";

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key: "7e26c6722e5de8a326e71bf65a8b0446",
		language: "en-US"
	}
});

export default api;