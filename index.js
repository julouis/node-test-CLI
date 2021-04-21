#!/usr/bin/env node

const { getCode, getName } = require("country-list");
const axios = require("axios").default;

var data = process.argv;

var year = data[3];
var country = data [2];

var countryCode = getCode(country);

if (countryCode) {
	if (!year) {
		year = new Date().getFullYear();
	}
	axios
		.get(
			`https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`
		)
		.then(function (response) {
			var data = response.data;
			data.forEach((holiday) => {
				console.log(
					`${holiday.date} - ${holiday.name} - ${holiday.localName} `
				);
			});
		})
		.catch(function (error) {
			console.log(error);
		});
} else {
	console.log("You need to enter a valid country name");
	console.log("Check the list here:");
	console.log("https://date.nager.at/Home/Countries");
}

/* 

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on('line', (input) => {
	console.log(`Received: ${input}`);
  }); */

/* rl.question("Country ? ", function (country) {
	countryCode = getCode(`${country}`);

	rl.question("Year ? ", function (year) {
		if (!year) {
			year = new Date().getFullYear();
		}

		if (countryCode) {
			axios
				.get(
					`https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`
				)
				.then(function (response) {
					var data = response.data;
					data.forEach((holiday) => {
						console.log(
							`${holiday.date} - ${holiday.name} - ${holiday.localName} `
						);
					});
				})
				.catch(function (error) {
					console.log(error);
				});
		} 

		rl.close();
	});
}); */
