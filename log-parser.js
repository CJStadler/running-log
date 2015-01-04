
var regexs =
		{
			set: /(\d+)\s?x\s?(\d+)\s?(m|meters|mi|miles|k|km|kilometers)?(?!\w)/ig,
			time: /(?:(\d+):(\d+))|(?:[\s\(](\d+(?:\.\d+)?)\s?(s|seconds|min|minutes)?(?!\w|:|x))/ig,
		};
/*
Function for parsing a text log description into an object representing the workout.
*/

var parse_log = function(text) {
	var data = [];
	
	var set_matches = get_matches(text, regexs.set, []);
	var time_matches = get_matches(text, regexs.time, []);
	
	data = match_sets_and_times(set_matches, time_matches);
	
	return data;
}

// Recursively 
var get_matches  = function(text, regex, matches) {
	
	var match = regex.exec(text);
	if (match !== null) {
		// remove empty groups
		match = match.filter(function(v) { return v ? true : false; });
		
		matches.push(match);
		matches = get_matches(text, regex, matches);
	}
	
	return matches
}

var match_sets_and_times = function(sets, times, data) {
	
	if (sets.length > 0) {
		var set = {};
		var raw_set = sets.shift();
		set.description = raw_set.shift();
		set.n = parseInt(raw_set.shift());
		set.distance = parseInt(raw_set.shift());
		set.units = raw_set.shift();
		
		set.times = [];
		for(var i=0; i<set.n; i++) {
			// assume the next n times match to the set's n intervals.
			set.times.push(times.shift());
		};
		/* Or should each interval be stored with the distance information?
		set.intervals = [];
		var interval;
		for(var i=0; i<set.n; i++) {
			// assume the next n times match to the set's n intervals.
			interval = {};
			interval.distance = set.distance;
			interval.unit = set.unit;
			interval.time = times.shift();
			
			set.intervals.push(interval);
		};
		*/
		
		data.push(set);
		data = match_sets_and_times(sets, times, data);
	} // we've processed each set
	
	return data;
};

var time_to_seconds = function(match) {
	var sec;
	if (match[0].indexOf(':') >= 0) { // format is min:seconds
		sec = parseFloat(match[2]) + parseInt(match[1]) * 60;
	} else { // either seconds or minutes
		sec = parseFloat(match[1]);
		if (match.length > 2) {
			var units = match[2];
			if (units == "min" || units == "minutes") {
				sec = sec * 60;
			};
		}; // else assume seconds
	};
	return sec;
};
