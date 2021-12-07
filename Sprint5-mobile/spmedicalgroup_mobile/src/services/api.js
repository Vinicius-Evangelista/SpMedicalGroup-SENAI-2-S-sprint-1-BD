// Configurações Axios
import axios from "axios";

//Definindo o caminho base da url
const api = axios.create({
 baseURL : 'http://192.168.3.253:5000/api'
});

export default api;