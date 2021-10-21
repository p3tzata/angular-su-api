var express = require("express");
var app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');

    next();
});


app.get("/moviesDb/popular", (req, res, next) => {
	
// res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//res.json(req.query.fake_api_key);
res.json({result:[
	{id:"1",
	image_url:"",
	title:"title1",
	release_date:"01.01.2021"},
	{id:"2",
	image_url:"",
	title:"title2",
	release_date:"01.01.2021"},
	{id:"3",
	image_url:"",
	title:"title3",
	release_date:"01.01.2021"}
]});

});






app.listen(3000, () => {
 console.log("Server running on port 3000");
});



