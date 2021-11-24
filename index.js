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
	image_url:"/assets/images/ladybird.jpg",
	title:"title1",
	release_date:"01.01.2021"},
	{id:"2",
	image_url:"/assets/images/ladybird.jpg",
	title:"title2",
	release_date:"01.01.2021"},
	{id:"3",
	image_url:"/assets/images/ladybird.jpg",
	title:"title3",
	release_date:"01.01.2021"}
]});

});



app.get("/moviesDb/popularKids", (req, res, next) => {
	
	// res.json(["Tony","Lisa","Michael","Ginger","Food"]);
	//res.json(req.query.fake_api_key);
	res.json({result:[
		{id:"11",
		image_url:"/assets/images/ladybird.jpg",
		title:"title11",
		release_date:"01.01.2021"},
		{id:"21",
		image_url:"/assets/images/ladybird.jpg",
		title:"title22",
		release_date:"01.01.2021"},
		{id:"31",
		image_url:"/assets/images/ladybird.jpg",
		title:"title33",
		release_date:"01.01.2021"}
	]});
	
	});

app.get("/moviesDb/movie/:id", (req, res, next) => {
	
	// res.json(["Tony","Lisa","Michael","Ginger","Food"]);
	//res.json(req.query.fake_api_key);
	req.params.id;
	res.json({result:
		{id:req.params.id,
		image_url:"/assets/images/ladybird.jpg",
		title:"title"+req.params.id,
		release_date:"01.01.2021",
		homepage: "www.example.com",
		genres:[{id:1,name:"drama"},{id:2,name:"action"}] }
		
	});
	
	});


	app.get("/moviesDb/movie/search/:stringSearch", (req, res, next) => {
	
		// res.json(["Tony","Lisa","Michael","Ginger","Food"]);
		//res.json(req.query.fake_api_key);
		req.params.id;
		res.json({result:[
			{id:99,
			image_url:"/assets/images/ladybird.jpg",
			title:req.params.stringSearch,
			release_date:"01.01.2021",
			homepage: "www.example.com",
			genres:[{id:1,name:"drama"},{id:2,name:"action"}] }]
			
		});
		
		});





app.listen(3000, () => {
 console.log("Server running on port 3000");
});



