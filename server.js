const express = require('express');
const hbs = require('hbs'); // handlebars for node
const fs = require('fs');

var app = express();


// hbs options
hbs.registerPartials(__dirname + '/views/partials'); // sets partials directory
app.set('view engine', 'hbs');  // set config to use "hbs"

// middleware
// (executed in the order you call app.use)

// app.use(req, res, next); is how you register middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${ now }: ${ req.method } ${ req.url }`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    // callback required...
    if (err) {
      console.log('Unable to append server.log');
    }
  });
  next(); // tell express we are done
});

app.use((req, res, next) => {
  res.render('maintenence');
});

app.use(express.static(__dirname + '/public'));  // serve static pages (absolute path)


// hbs helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return `<strong>${text.toUpperCase()}</strong>`;
});


app.get('/', (req, res) => {

  // res.send('<h1>Hello Express</h1>');
  res.render('home', {
    title: 'Home Page',
    welcomeMessage: 'Good morning'
  });

});

app.get('/about', (req, res) => {
  // res.send('About me');
  res.render('about', {
    title: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Server blew up!'
  });
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
