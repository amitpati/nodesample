var express = require('express');
var app = express();
var request = require("request");
const port = process.env.PORT || 3030; 
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
}); 
app.get('/faq', function (req, res) {
    res.sendFile(__dirname + "/faq.html");
}); 
app.get('/spanish', function (req, res) {
    res.sendFile(__dirname + "/spanish.html");
});

app.use(express.static(__dirname + 'public'));
app.use('/img',express.static(__dirname + 'img')); //Serves resources from public folder

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    } 
})  
