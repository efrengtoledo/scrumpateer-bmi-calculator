const express = require('express')
app = express()

var url = require('url');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))

// The app.get functions below are being processed in Node.js running on the server.
// Implement a custom About page.
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

app.get('/version', (request, response) => {
	console.log('Calling "/version" on the Node.js server.')
	response.type('text/plain')
	response.send('Version: '+majorVersion+'.'+minorVersion)
})

// Return the value of 2 plus 2.
app.get('/2plus2', (request, response) => {
	console.log('Calling "/2plus2" on the Node.js server.')
	response.type('text/plain')
	response.send('4')
})

// Add x and y which are both passed in on the URL. 
app.get('/add-two-integers', (request, response) => {
	console.log('Calling "/add-two-integers" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let x = parseInt(inputs.x)
	let y = parseInt(inputs.y)
	let sum = x + y
	response.type('text/plain')
	response.send(sum.toString())
})

// Template for calculating BMI using height in feet/inches and weight in pounds.
app.get('/calculate-bmi', (request, response) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

	console.log('Height:' + heightFeet + '\'' + heightInches + '\"')
	console.log('Weight:' + weight + ' lbs.')

	// Todo: Implement unit conversions and BMI calculations.
	// Todo: Return BMI instead of Todo message.

	response.type('text/plain')
	response.send('Todo: Implement "/calculate-bmi"')
})

// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	// Parse the query string for values that are being passed on the URL.
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
})

// Return Batman as JSON.
var spiderMan = {
	"firstName":"Bruce",
	"lastName":"Wayne",
	"preferredName":"Batman",
	"email":"darkknight@lewisu.edu",
	"phoneNumber":"800-bat-mann",
	"city":"Gotham",
	"state":"NJ",
	"zip":"07101",
	"lat":"40.73",
	"lng":"-74.17",
	"favoriteHobby":"Flying",
	"class":"cpsc-24700-001",
	"room":"AS-104-A",
	"startTime":"2 PM CT",
	"seatNumber":"",
	"inPerson":[
		"Monday",
		"Wednesday"
	],
	"virtual":[
		"Friday"
	]
}

app.get('/batman', (request, response) => {
	console.log('Calling "/batman" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(spiderMan, null, 4))
})

app.get('/calculations', (request, response) => {
	console.log('Calling calculations.');
	var age = Document.GetElementByID("age");
    var height = Document.GetElementByID("height");
    var weight = Document.GetElementByID("weight");
    var sysbp = Document.GetElementByID("systolic");
    var diabp = Document.GetElementByID("diastolic");
    var histdiabetes = Document.GetElementByID("diabetes").checked;
    var histcancer = Document.GetElementByID("cancer").checked;
    var histalzheimer = Document.GetElementByID("alzheimer").checked;
    var totalrisk = 0;
    var risk = "Default";
    //Age calculations.
    if (age > 60) {
        totalrisk+= 30;
    }
    else if (age > 45) {
        totalrisk+= 20;
    }
    else if (age > 30) {
        totalrisk+= 10;
    }
    else {
        totalrisk+= 0;
    }
    //Calculating BMI
    var metricheight = height / 1550;
    var metricweight = weight / 2.205;
    var BMI = metricweight / metricheight;
    if (BMI >= 30) {
        totalrisk+= 75;
    }
    else if (BMI >= 25) {
        totalrisk+= 30;
    }
    else {
        totalrisk+= 0;
    }
    //Calculating blood pressure.
    if (sysbp >= 180 || diabp >= 120) {
        totalrisk+= 100;
    }
    else if (sysbp >= 140 || diabp >= 90) {
        totalrisk+= 75;
    }
    else if (sysbp >= 130 || diabp >= 80) {
        totalrisk+= 30;
    }
    else if (sysbp >= 120 && diabp < 15) {
        totalrisk+= 15;
    }
    else {
        totalrisk+= 0;
    }
    //Family history
    if (histdiabetes == true) {
        totalrisk+= 10;
    }
    if (histcancer == true) {
        totalrisk+= 10;
    }
    if (histalzheimer == true) {
        totalrisk+= 10;
    }
    //Final conclusion.
    if (totalrisk <= 20) {
        risk = "Low Risk";
    }
    else if (totalrisk <= 50) {
        risk = "Moderate Risk";
    }
    else if (totalrisk <= 75) {
        risk = "High Risk";
    }
    else {
        risk = "Uninsurable";
    }
    response.type('text/plain');
	response.send(risk);
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)
