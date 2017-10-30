// Express is a minimal and flexible Node.js web application framework 
    // that provides a robust set of features for web and mobile applications.

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// initialize app
const app = express();

// letting jade know where to look for views
app.set('views', path.join(__dirname, 'views'));

// set the view engine
app.set('view engine', 'jade');


// Node.js body parsing middleware.
    // Parse incoming request bodies in a middleware before your handlers, 
    // available under the req.body property.
app.use(bodyParser.json());

// Returns middleware that only parses urlencoded bodies and only looks at 
    // requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({extended: false}));


// setting the public folder as the static folder for css
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    console.log('hello in the console');
    res.render('index', {title: 'Welcome to this lovely app'});
});

app.get('/about', function(req, res){
    console.log('hello in the about');
    res.render('about');
});

app.get('/contact', function(req, res){
    console.log('hello in the contact');
    res.render('contact');
});

app.post('/contact/send', function(req, res){
    console.log('submit clicked');

    // Create a SMTP transport object
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "emailaddress@example.com",
            pass: "password"
        }
    });

    console.log('SMTP Configured');

    // Message object
    const message = {

    // sender info
    from: 'Sender Name <emailaddress@example.com>',

    // Comma separated list of recipients
    to: '"Receiver Name" <emailaddress@example.com>',

    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔', 

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'
    };

    console.log('Sending Mail');
    transporter.sendMail(message, function(error, info){
    if(error){
    console.log('Error occured');
    console.log(error.message);
    res.redirect('/');
    return;
    }
    console.log('Message sent successfully!', info.response);
    res.redirect('/');
    // if you don't want to use this transport object anymore, un-comment following line
    // transporter.close(); // close the connection pool
    });
});

const port = 3000;
app.listen(port);
console.log(`Server is running on port ${port}`);