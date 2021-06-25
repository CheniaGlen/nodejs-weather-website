const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils.js/geocode");
const forecast = require("./utils.js/forecast");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory
app.use(express.static(publicDirectoryPath));
//Express Handler

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Chenia Falcatan",
	});

	app.get("/about", (req, res) => {
		res.render("about", {
			title: "About Page",
			name: "Chenia Falcatan",
		});
	});

	app.get("/help", (req, res) => {
		res.render("help", {
			title: "Help Page",
			message: "This page is for training purposes only.",
			name: "Chenia Falcatan",
		});
	});

	app.get("/weather", (req, res) => {
		if (!req.query.address) {
			return res.send({
				error: "Please provide address.",
			});
		}
		geocode(
			req.query.address,
			(error, { latitude, longitude, location } = {}) => {
				if (error) {
					return res.send({ error });
				}
				forecast(latitude, longitude, (error, forecastData) => {
					if (error) {
						return res.send({ error });
					}

					res.send({
						forecast: forecastData,
						location,
						address: req.query.address,
					});
				});
			}
		);
	});
	app.get("/product", (req, res) => {
		if (!req.query.search) {
			return res.send({ error: "You must provide a search term." });
		}
		console.log(req.query.search);
		res.send({
			products: [],
		});
	});
	app.get("/help/*", (req, res) => {
		res.render("404", {
			title: "404",
			name: "Chenia Falcatan",
			errorMessage: "No articles found on this page.Please search again.",
		});
	});
	app.get("*", (req, res) => {
		res.render("404", {
			title: "404",
			name: "Chenia Falcatan",
			errorMessage: "Page not found.",
		});
	});
});
// app.com;
// app.com / help;
// app.com/about
app.listen(port, () => {
	console.log("Server is up on port" + port);
});
