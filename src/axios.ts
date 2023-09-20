
import { Axios } from "./core/Axios";
import { Cancel,isCancel,CancelToken } from "./core/cancel";
import defaults from "./core/default";
import mergeConfig from "./core/mergeConfig";
import { extend } from "./utils/common";

function createInstance(initConfig){
	const context = new Axios(initConfig);
	const instance = Axios.prototype.request.bind(context);
	
	extend(instance,context);

	return instance;
}


const axios = createInstance(defaults);

axios.create = function(config){
	const initConfig = mergeConfig(config,defaults);
	return createInstance(initConfig);
};

axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.Cancel = Cancel;

export default axios;