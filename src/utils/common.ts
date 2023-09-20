export function extend(to:any,from:any){
	const res = to;
	Object.getOwnPropertyNames(from.__proto__).forEach(key=>{
		if(key !== "constructor"){
			res[key] = from[key];
		}
	});
	Object.getOwnPropertyNames(from).forEach(key=>{
		if(key !== "constructor"){
			res[key] = from[key];
		}
	});
	return res;
}


export const isDate = (val) => {
	return toString.call(val) === "[object Date]";
};
  
export const isPlainObject = (val) => {
	return toString.call(val) === "[object Object]";
};
  
export const isURLSearchParams = (val) => {
	return typeof val !== "undefined" && val instanceof URLSearchParams;
};

export const deepMerge = (...objs) => {
	const result = Object.create(null);
	objs.forEach((obj) => {
		if (obj) {
			Object.keys(obj).forEach((key) => {
				const val = obj[key];
				if (isPlainObject(val)) {
					if (isPlainObject(result[key])) {
						result[key] = deepMerge(result[key], val);
					} else {
						result[key] = deepMerge(val);
					}
				} else {
					result[key] = val;
				}
			});
		}
	});
  
	return result;
};