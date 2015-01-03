
var titles = [{input:"10mi. Centennial", output: {miles: 10}}];
var descriptions = [];

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
		assert.equal(result, io.output, "result: " + io.input + " != expected: " + io.output);
	});
});

QUnit.test("get_matches test", function( assert ) {
	var text = "test test 4x200m test test 3x1600 test"
	var expected = [["4x200m","4", "200", "m"],["3", "1600"]];
	var result = get_matches(text, regexs.set, []);
	assert.equal(result, expected);
});