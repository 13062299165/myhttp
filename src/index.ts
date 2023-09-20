import axios from "./axios";
const {cancel,token} = axios.CancelToken.source();
axios({
	method: "post",
	url: "https://reqres.in/api/users#999",
	data: {
		"name": "frankshi",
		"job": "FE"
	}
}).then((res)=>{
});
axios.post("https://reqres.in/api/users#999", {
	"name": "frankshi",
	"job": "FE"
},{cancelToken:token});
cancel("2323");