export class Cancel{
	message:string;
	constructor(message){
		this.message = message;
	}
}

export function isCancel(value){
	return value instanceof Cancel;
}

export  class CancelToken {
	promise;//存储状态
	reason;//存储错误原因

	constructor(executor){
		let resolvePromise;
		this.promise = new Promise(resolve=>{
			resolvePromise = resolve;
		});
		const paramFn = message=>{
			if(this.reason) return;
			this.reason = new Cancel(message);
			resolvePromise(this.reason);
		};
		executor(paramFn);
	}

	throwIfRequested(){
		if(this.reason)throw this.reason;
	}

	static source(){
		let cancel;
		const token = new CancelToken(c=>{cancel = c;});
		return {
			cancel,
			token
		};
	}
}