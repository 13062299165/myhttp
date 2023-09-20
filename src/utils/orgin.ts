export function isURLSameOrigin(url:string){
	if(url.indexOf("?") !== -1) return window.location.href === url.slice(0,url.indexOf("?"));
	else return window.location.href === url;
}