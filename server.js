// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
/* Data */
projectData = {};

/* Routes */
app.get("/journalentry", getWeatherData);
app.post("/journalentry", addWeatherData);

/** Routes Helper Functions */

function getWeatherData(req, res) {
    res.send(projectData);
}

function addWeatherData(req, res) {
    const postData = req.body;
    projectData['temperature'] = postData.temperature;
    projectData['date'] = postData.date;
    projectData['user_response'] = postData.user_response;
}

/* Spin up Server */
const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(`Server running on localhost port ${port}`);
}