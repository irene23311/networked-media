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

app.get('/pattern-detail', (request, response) => {
  response.render('pattern-detail.ejs');
});

app.get("/gallery", (request, response) => {
  response.render("gallery.ejs", { clientPosts: serverStoredPosts });
});

app.get("/profile", (request, response) => {
  response.render("profile.ejs");
});

app.get('/about', (request, response) => {
  response.render('about.ejs');
});

app.post('/upload', upload.single('theimage'), (req, res) => {
	let currentDate = new Date();

	let data = {
		text: req.body.text,
		author: req.body.author,
		description: req.body.description,
		date: currentDate.toLocaleString(),
		timestamp: currentDate.getTime(),
	};

	if (req.file) {
		data.image = '/uploads/' + req.file.filename;
	}
	serverStoredPosts.push(data);

	res.redirect(req.body.redirectTo || '/gallery');
});

const PORT = process.env.PORT || 3004;
const HOST = process.env.HOST || "0.0.0.0";

// Bind to all interfaces in production so the droplet can accept external traffic.
app.listen(PORT, HOST, () => {
  console.log(`server is running on http://${HOST}:${PORT}`);
});
