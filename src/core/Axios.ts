import InterceptorManager from "./InterceptorManager";
import { dispatchRequest } from "./dispatchRequest";

import  mergeConfig  from "@/core/mergeConfig";

export class Axios{
	config = {};
	interceptors : {
		request: InterceptorManager,
		response: InterceptorManager
	};
	constructor(initConfig){
		this.interceptors = {
			request:new InterceptorManager(),
			response:new InterceptorManager()
		};
		this.config = initConfig;
	}
	request(config){
		
		config = mergeConfig(this.config,config);
		//将拦截器按时序排列，逐个执行
		const progress = [
			{
				resolved:dispatchRequest(config),
				rejected:undefined
			}
		];
        
		this.interceptors.request.forEach(interceptor=>{return progress.unshift(interceptor);});
		this.interceptors.response.forEach(interceptor=>{return progress.push(interceptor);});
		//链式调用 请求拦截器--》请求发起--》响应拦截器
		let promise = Promise.resolve(config);
		while(progress.length){
			const {resolved,rejected} = progress.shift();
			promise = promise.then(resolved,rejected);
		}
		return promise;
	}

	get(url,param){
		return this.__parseRequestWithoutData("get",url,param);
	}
	post(url,data,config){
		return this.__parseRequestWithData("post",url,data,config);
	}
	delete(url,config){
		return this.__parseRequestWithoutData("delete",url,config);
	}
	options(url,config){
		return this.__parseRequestWithoutData("options",url,config);
	}
	put(url,data,config){
		return this.__parseRequestWithData("put",url,data,config);
	}
	patch(url,data,config){
		return this.__parseRequestWithData("patch",url,data,config);
	}
	private __parseRequestWithData(method,url,data,config){
		return this.request(Object.assign(config || {},{
			method,
			data,
			url,
		}));
	}
	private __parseRequestWithoutData(method,url,config){
		return this.request(Object.assign(config || {},{
			method,
			url,
		}));
	}

}
