export function processResponse(request,config){
	const responseHeader = request.getAllResponseHeaders();
	const responseData = request.responseType && request.responseType !== "text" ? request.response : request.responseText;
	const response = {
		headers:responseHeader,
		data:responseData,
		status:request.status,
		statusText:request.statusText,
		config,
		request
	};
	return response;
}