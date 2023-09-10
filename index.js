const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('dotenv').config();
const bodyParser = require('body-parser')

const app = express();

let entries = [];
app.locals.entries = entries;

/* ======================= ALL MIDDLEWARES ===========================*/
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
let jsonParser = bodyParser.json()

/* Variables */
app.set("views", path.resolve(__dirname, 'views'))
app.set("view engine", 'ejs')

/*=========================ROUTING======================================*/

app.get('/', (req, res) =>{
	res.render("index", {
		message: "Lucas's Guestbook",
		entries: entries
	})
})
app.get('/new-entry', (req, res) =>{
	res.render("new-entry")
})

app.post('/new-entry', jsonParser, (req, res) =>{
	let {title, body} = req.body

	if(!title){
		res.status(400).send(JSON.stringify({success: false, msg: "An entry has to have a title!"}))
		return 
	}

	if(!body){
		res.status(400).send(JSON.stringify({success: false, msg: "An entry has to have a body!"}))
		return
	}

	entries.push({title, body, created_at: new Date()})
	return res.redirect("google.com")
})
app.get('/contacts', (req, res) =>{
	res.writeHead(200, {'Content-type': 'application/json'});
	res.end(JSON.stringify({success: true, msg: "You are at contacts page!"}));
})

app.use((req, res)=>{
	res.writeHead(404)
	res.end("WOW! It does not exist!")
})

app.listen(process.env.PORT, () => console.log(`Aplicação rodando na porta ${process.env.PORT}`));
