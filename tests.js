
var titles = [{input:"10mi. Centennial", output: {miles: 10}}];
var descriptions = [];
var set_matches = [
	{
		text: "test test 4x200m test test 3x1600 test",
		expected: [["4x200m","4", "200", "m"],["3x1600", "3", "1600"]]
	},
	{
		text: "5x400, 5x200. ended up doing 78, 81, 81, 81, 80 w/ 200 jog between.",
		expected: [["5x400", "5", "400"],["5x200","5","200"]]
	}
];
var time_matches = [
	{
		text: "Tutorial. 4:32. 75s. 72 Sample text",
		expected: [["4:32", "4", "32"], [" 75s", "75", "s"], [" 72", "72"]]
	}
];

var object_compare = function(a,b) {
	return JSON.stringify(a) == JSON.stringify(b);
}

QUnit.test( "parse_log defined", function( assert ) {
  assert.ok( typeof(parse_log) == "function", "not a function" );
});

QUnit.test("get_matches defined", function( assert ) {
	assert.ok( typeof(get_matches) == "function", "not a function" );
});

QUnit.test("parses total mileage", function(assert) {
    var result;
	titles.forEach(function(io) {
	    result = parse_log(io.input);
		assert.ok(object_compare(result, io.output));
	});
});

QUnit.test("match sets test", function( assert ) {
	var result;
	set_matches.forEach(function(io) {
		result = get_matches(io.text, regexs.set, []);
		assert.ok(object_compare(io.expected,result));
	});
});

QUnit.test("match times test", function(assert) {
	var result;
	time_matches.forEach(function(io) {
		result = get_matches(io.text, regexs.time, []);
		assert.ok(object_compare(io.expected,result));
	});
});

QUnit.test("data from sets and times", function(assert) {
	var sets = [["2x400", "2", "400"],["2x200","2","200"]];
	var times = [[" 75s", "75", "s"],[" 75s", "75", "s"],[" 31s", "31", "s"],[" 32s", "32", "s"]];
	var expected = 
		[
			{
				description: "2x400",
				n: 2,
				distance: 400,
				units: undefined,
				times: [[" 75s", "75", "s"],[" 75s", "75", "s"]]
			},
			{
				description: "2x200",
				n: 2,
				distance: 200,
				units: undefined,
				times: [[" 31s", "31", "s"],[" 32s", "32", "s"]]
			}
		]
	var result = match_sets_and_times(sets, times, []);
	assert.ok(object_compare(expected, result));
});

QUnit.test("test time to seconds", function(assert) {
	var times = [[" 75.24s", "75.24", "s"],[" 75s", "75", "s"],[" 31.3", "31.3"],[" 32s", "32", "s"],["4:32", "4", "32"]];
	var expected = [75.24, 75, 31.3, 32, 272];
	var result;
	times.forEach(function(t, i) {
		result = time_to_seconds(t);
		assert.equal(result,expected[i]);
	});
});