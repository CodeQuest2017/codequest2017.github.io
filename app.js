;(function(window, document, undefined) {
	"use strict";

	var P = window.problems;
	var T = window.titles;
	var GITHUB_URL = "https://github.com/CodeQuest2017/";

	// Add all the problems to a years object in the following format:
	// e.g. {2012: [P1, P2], 2013: [P2, P4]}
	var years = {};

	for(var i = 0; i < P.length; i++) {
		var thisYear = P[i].year;
		if(years[thisYear] == null) {
			years[thisYear] = [P[i]];
		} else {
			years[thisYear].push(P[i]);
		}
	}

	// For each year, make the appropriate code
	var code = [];
	for(var year in years) {
		// Year header
		var output = "<h2>" + year + "</h2>";
		output += "<p>";
		var problemsUrl = GITHUB_URL + "Problems/blob/master/" + year + ".docx?raw=true";
		var solutionsUrl = GITHUB_URL + "Solutions/tree/master/" + year;
		var testCasesUrl = GITHUB_URL + "Cases/tree/master/" + year;
		output += "<a href='" + problemsUrl + "'>Problems</a> | ";
		output += "<a href='" + solutionsUrl + "'>Solutions</a> | ";
		output += "<a href='" + testCasesUrl + "'>Test Cases</a>";
		output += "</p>";

		output += "<table>";
		output += "<tr>";
		output += "<th class='ProblemNumber'>#</th>";
		output += "<th class='ProblemTitle'>Title</th>";
		output += "<th>Solved By</th>";
		output += "<th>Details</th>";
		// output += "<th># Attempts</th>";
		output += "<th>Source Code</th>";
		output += "</tr>";

		for(var i = 0; i < years[year].length; i++) {
			var problem = years[year][i];
			var color = "red";
			if(problem.compileTimeError == null &&
				problem.runTimeError == null &&
				problem.lineCountError == null) {
				color = "green";
			}
			output += "<tr class='ProblemStatus-" + color + "'>";
			output += "<td>" + problem.number + "</td>";
			var filename = "Prob" + (problem.number > 9 ? problem.number : "0" + problem.number) + ".java";
			var url = GITHUB_URL + problem.year + "/tree/master/" + problem.name + "/" + filename;
			output += "<td>" + T[year][problem.number - 1] + "</td>";
			output += "<td>" + problem.name + "</td>";
			if(color == "green") {
				output += "<td>All correct.</td>";
			} else {
				console.warn("Error details for " + year + " #" + problem.number + " by " + problem.name + ": ");
				if(problem.compileTimeError) {
					output += "<td>Compile time error.</td>";
					console.log(problem.compileTimeError);
				}
				if(problem.runTimeError) {
					output += "<td>Runtime error.</td>";
					console.log(problem.runTimeError);
				}

				if(problem.lineCountError) {
					output += "<td>Line count error.</td>";
					console.log(problem.lineCountError);
				}
			}
			// output += "<td>" + problem.counter + "</td>"
			output += "<td><a href='" + url + "'>" + filename + "</a></td>";
			output += "</tr>";
		}

		output += "</table>";
		code.push(output);
	}

	document.getElementById("Problems").innerHTML = code.join("");

})(window, document);

