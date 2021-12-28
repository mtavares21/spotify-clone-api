// Transform req.params in query string
exports.queryToParams = (query) => {
	const keyArray = Object.keys(query);
	const valueArray = Object.values(query)
	let i;
	let buffer = "?";

	for (i=0; i < keyArray.length; i++){
		buffer += keyArray[i] +  '=' + encodeURIComponent(valueArray[i]);
		if (i < keyArray.length - 1)
			buffer+="&"
	}

	return buffer
}