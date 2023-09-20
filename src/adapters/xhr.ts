import cookie from "@/utils/cookie";
import { isURLSameOrigin } from "@/utils/orgin";
import { processResponse } from "@/utils/response";

export default (config)=>{
	return new Promise((resolve)=>{
		const {
			data = null, url , method = "get",headers = {} ,withCredentials,xsrfCookieName,xsrfHeaderName
		} = config;
		const request = new XMLHttpRequest();
		request.open(method.toUpperCase(),url,true);
		// 设置请求头
		Object.keys(headers).forEach((headerName:string)=>{
			if(data == null && headerName.toLowerCase() !== "content-type"){
				delete headers[headerName];
			}else{
				request.setRequestHeader(headerName,headers[headerName]);
			}
		});
		//配置跨域
		request.withCredentials = withCredentials;
		request.send(data);
		if((withCredentials || isURLSameOrigin(url)) && xsrfCookieName ){
			// 通过cookie 去读取对应的 xsrfHeaderName 值
			const xsrfValue = cookie.get(xsrfCookieName);
			if(xsrfValue && xsrfHeaderName){
				headers[xsrfHeaderName] = xsrfValue;
			}
		}

		request.onreadystatechange = ()=>{
			if(request.readyState == 0 || request.readyState == 4){
				return;
			}
			const response = processResponse(request,config);
			resolve(response);
		};

		//监听cancelToken.promise状态改变，改变则取消请求
		if(config.cancelToken){
			config.cancelToken.promise
				.then(reason=>{
					request.abort();
					return Promise.reject(reason);
				})
				.catch(()=>{});
		}
	});
};

