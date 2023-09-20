const defaults = {
	method:"get",
	timeout:0,
	baseURL:"",
	headers:{common:{Accept:"application/json, text/plain, */*"}},
	xsrfCookieName: "XSRF-TOKEN", // 默认配置
	xsrfHeaderName: "X-XSRF-TOKEN" // 默认配置
};
// 'delete', 'get', 'head', 'options' 这四种类型请求时默认 headers 为空
const methodsNoData = ["delete", "get", "head", "options"];

methodsNoData.forEach(method => {
	defaults.headers[method] = {};
});

// 'post', 'put', 'patch' 这三种类型请求时设置一个默认的 Content-Type
const methodsWithData = ["post", "put", "patch"];

methodsWithData.forEach(method => {
	defaults.headers[method] = {"Content-Type": "application/x-www-form-urlencoded"};
});

export default defaults;