const express = require("express");
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'public/uploads' });
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 
let serverStoredPosts = [];

app.get("/", (request, response) => {
  response.render("landing.ejs");
});

app.get("/home", (request, response) => {
  response.render("home.ejs",{clientPosts: serverStoredPosts });
});

app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	let data = {
		text: req.body.text,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}
	serverStoredPosts.push(data);

	res.redirect('/home');
});

//very last
app.listen(3003, () => {
  console.log("server is running");
});