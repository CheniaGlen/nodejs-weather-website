const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=52095adadec0448780eabe5d969590fb&query=" +
		latitude +
		"," +
		longitude +
		"&units=f";
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather updates!", undefined);
		} else if (body.error) {
			callback("Unable to find location. Try search again!", undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions +
					". It is currently " +
					body.current.temperature +
					" degrees out. It feels like " +
					body.current.feelslike +
					" degrees out."
			);
		}
	});
};

module.exports = forecast;
