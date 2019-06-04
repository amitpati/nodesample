var express = require('express');
var app = express();
var request = require("request");

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));  
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

const fs = require('fs');
//
app.use(express.static('public'));
app.use('/static', express.static('public'))
const uploadImage = async (req, res, next) => {

    try {
        console.log(req)
        console.log("****string*********" +req.body.userid)
        // to declare some path to store your converted image
        // const path = './img/' + Date.now() + '.png';
        const path = './public/' + req.body.userid + '.png';

        console.log("*************" + path)
        console.log(">>>>>>>>>" + req.body.userid) 
        const imgdata = req.body.base64image;
        console.log(imgdata)
        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');

        fs.writeFileSync(path, base64Data, { encoding: 'base64' });
        var request = require("request");

        request({
            url: "https://apex.oracle.com/pls/apex/appdevbangalore24/assethub/uploadimage",
            method: "POST",
            json: true,
            timeout: 200000,
            body: {
                "userid": req.body.userid+'@oracle.com',
                "imageurl": path,
            },
            headers: {
                "Content-Type": "application/json"
            },
        }, function (error, response, body) {
            if (error) {
                console.log("Request error: " + JSON.stringify(error));
                return [];
            } else {
                console.log("Request success2: " + response);
                //res.status(200).send("Success");
            }
        });
        return res.send("https://nodeapporacle.herokuapp.com/static/" + req.body.userid + '.png');

    } catch (e) {
        next(e);
    }
}
app.post('/upload/image', uploadImage)


app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})  
