
var regexs =
		{
			set: /(\d+)\s?x\s?(\d+)\s?(m|meters|mi|miles|k|km|kilometers)(?!\w)/ig,
			time: /\d+:\d+/ig,
			seconds: /[\s(](\d+\.?\d+)\s?(?:s|seconds)?(?!\s?\w|:|x)/ig
		};
/*
Function for parsing a text log description into an object representing the workout.
*/

var parse_log = function(text) {
	var data;
	
	var sets = get_matches(text, regexs.set, []);
	
	return data;
}

// Recursively 
var get_matches  = function(text, regex, matches) {
	
	var match = regex.exec(text);
	
	if (match !== null) {
		matches.push(match);
		matches = get_matches(text, regex, matches);
	}
	
	return matches
}