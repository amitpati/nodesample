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

app.get('/taleo', function (req, res) {
    res.sendFile(__dirname + "/taleo.html");
});
app.get('/getData', function (req, res) {
    
	
	request.get("http://129.213.72.248:8001/asset/allFilters", (error, response, body) => {
        if (error) {
            res.send(500, error);
        }
        console.log(JSON.parse(body));
        var resData = JSON.parse(body)
        res.send(200, resData);
    });

})

app.use(express.static(__dirname + 'public'));
app.use('/img',express.static(__dirname + 'img')); //Serves resources from public folder

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    } 
})  
