Running Log
===========

A running log web application.

Goals:
	* Prioritize simplicity.
	* Should be familiar to current users of Merv (include essential features).
	* Tools for better understanding data. Visualizations and statistics.
	
# Possible advanced features

## Log parsing

Workout titles and descriptions should will entered as text, but then parsed into machine readable data.
This will allow deeper analysis of data while minimizing user effort.

Examples:
	* Just put the distance in the title -- "4mi. Trail" will automatically set the total distance to 4mi.
	* The description "4x200m in 33, 34, 33, 32 with 60s rest" will be parsed into something like
	'''
	[
		{distance: 200, time: 33, rest: 60},
		{distance: 200, time: 34, rest: 60},
		{distance: 200, time: 33, rest: 60},
		{distance: 200, time: 32, rest: 60}
	]
	'''

Parser should be robust enough to understand most common log formats. Since mistakes are inevitable, the user will be able to check and modify the result of parsing.
	
## Social Features

Commenting.
