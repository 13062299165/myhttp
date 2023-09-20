import http from "@/adapters/http";
import xhr from "@/adapters/xhr";
import { processData } from "@/utils/data";
import { processHeader } from "@/utils/headers";
import { processUrl } from "@/utils/url";

function getDefaultRequest(){
	let adapter;
	if(window){
		adapter = xhr;
	}else if(global){
		adapter = http;
	}
	return adapter;
}

export const dispatchRequest = (config)=>{
	//处理参数
	processUrl(config);
	processHeader(config);
	processData(config);
	const adapter = getDefaultRequest();
	return adapter(config);
};