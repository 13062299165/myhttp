import { isPlainObject } from "./common";
function normalizeHeader(headers,normalHeaderName:string){
	const parsedHeader = {...headers};
	Object.keys(headers).forEach((name:string) => {
		if(name.toLowerCase() === normalHeaderName.toLowerCase()){
			parsedHeader[normalHeaderName] = headers[name]; 
			delete parsedHeader[name];
		}
	});
	return parsedHeader;
}

/**
 * 采用json格式发送
 */
export function processHeader(config){
	const {headers,data} = config;

	
	if(config.headers){
		normalizeHeader(headers,"Content-Type");
	}else{
		config.headers = {};
	}

	if(isPlainObject(data)){
		config.headers["Content-Type"] = "application/json;charset=utf-8";
	}
}