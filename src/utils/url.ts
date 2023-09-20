import { commonObj } from "./type";

/**
 * 处理哈希值与url中的查询参数
 */
const processURL = (url:string):string[]=>{
	const hashStartIndex = url.indexOf("#");
	const paramStartIndex = url.indexOf("?");
	const returnVal = [url,null];
	if(hashStartIndex !== -1)
		returnVal[0] = url.slice(0,hashStartIndex);
	
	if(paramStartIndex !== -1)
		returnVal[1] = url.slice(paramStartIndex,url.length - 1);
	return returnVal;
};

const processParam = (param:commonObj):string=>{
	if(!param)return;
	let finalParam;
	// URLSearchParms直接转序列化
	if(param instanceof URLSearchParams){
		finalParam = param.toString();
	} else{
		const singles = [];
		Object.keys(param).forEach((key)=>{
			const val = param[key];
			let parsedKey = key;
			let values:any[] = [];
			//请求参数重数组表现为 key[]=xxx&&key[]=yyy
			if(Array.isArray(val)){
				parsedKey += "[]";
				values = val;
			}else{
				// 磨平差异，统一处理
				values = [val];
			}
			values.forEach((el)=>{
				const eltype = toString.call(el);
				let parsedVal;
				switch (eltype){
				case "[object Date]":
					parsedVal = (el as Date).toISOString;
					break;
				case "[object Object]":
					parsedVal = JSON.stringify(el);
					break;
				default:break;
				}
				singles.push(`${parsedKey}=${parsedVal}`);
			});
		});
		finalParam = singles.join("&");
	}
	return finalParam;
};

export function processUrl(config){
	const {
		baseURL , url  , param 
	} = config;
	const [url2,param1] = processURL(url);
	const param2 = processParam(param);
	config.url = url2;
	if(param1 && param2){
		config.url = baseURL + config.url + (param1 ? "&" : "?") + param2;		
	}
}