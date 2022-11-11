const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const session = require('express-session')

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))

//Authentication Middleware
app.use('/private',(req, res, next)=>{
    if (!req.session.login) {
        return res.status(403).render('users/errors', 
        {
        noLogged: true, 
        title: "403: Forbidden"
        })
    }
    next();

})

//Logging Middleware
app.use((req, res, next)=>{
    let currentTimeStamp=new Date().toUTCString();
    let requestMethod=req.method;
    let requestRoute=req.originalUrl;
    if (!req.session.login){
        console.log(`[${currentTimeStamp}]: ${requestMethod} ${requestRoute} (Authenticated User: false)`);
    }
    else{
        console.log(`[${currentTimeStamp}]: ${requestMethod} ${requestRoute} (Authenticated User: true)`);
    }
    next();
})

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});