const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
require('./config/database')(config);
const passport = require('passport');
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')

var express = require("express");
var app = express();
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
TOKEN_SECRET="09f26e402586e2faa8da4c98a35f1b20d6b03"

app.use(passport.initialize());
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)



app.use(express.json()); 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Authorization,Custom-app, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});


// routes
app.use('/wsh-task/auth', authRoutes)
app.use('/wsh-task/task', taskRoutes)








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



app.post("/authFake/singUp",(req,res, next) => {
	
	res.json({message: "Registered",userId: 2})
	
} );

app.post("/authFake/singIn",(req,res, next) => {
	
	console.log(req.body.password)

	if (req.body.username=="admin" && req.body.password=="123456") {
		const token = generateAccessToken({ username: req.body.username });
		return res.json({message: "Logged",userId: 2, token: token});
	} else {
		return res.sendStatus(403)
	}


	
	
} );



app.get("/dashboard", (req, res, next) => {
	const isAuthanticate = authenticateToken(req);
	console.log(isAuthanticate)
	if(isAuthanticate) {

	return res.json({
		message: "sensitive info"	
	});
	} else {
		res.sendStatus(403);
	}





	});




function generateAccessToken(username) {
	return jwt.sign(username, TOKEN_SECRET, { expiresIn: '180s' });
  }


  function authenticateToken(req) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
	let result;
	if (token == null) result=false
	
	jwt.verify(token, TOKEN_SECRET, (err, authData) => {

	  if (err) {	
		result=false
	  } else {
	  	result=true
	  }
	})

	return result;

  }



app.listen(3000, () => {
 console.log("Server running on port 3000");
});



