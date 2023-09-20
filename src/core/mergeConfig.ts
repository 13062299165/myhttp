export default function mergeConfig(defaultConfig,userConfig){
	const config = Object.create({});
	//header特殊处理
	Object.keys(defaultConfig).forEach((key)=>{
		if(key !== "headers"){
			config[key] = defaultConfig[key];
		}
	});
	Object.keys(userConfig).forEach((key)=>{
		config[key] = userConfig[key];
	});
	//
	if(!config.headers){
		config.headers = defaultConfig.headers[config.method];
	}else{
		config.headers = {
			...defaultConfig.headers[config.method],
			...userConfig.headers
		};
	}
	return config;
}

