
import { isPlainObject } from "./common";
export function processData(config){
	if(isPlainObject(config.data)){
		config.data = JSON.stringify(config.data);
	}
}