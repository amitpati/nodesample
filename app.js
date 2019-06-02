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
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
const uploadImage = async (req, res, next) => {

    try {
console.log(req.body.userid)
        // to declare some path to store your converted image
       // const path = './img/' + Date.now() + '.png';
         const path = './img/' + req.body.userid + '.png';
        const imgdata = req.body.base64image;

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
                "userid": req.body.userid,
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
                console.log("Request success2: " + body);

                return res.send(response.statusCode, body);
            }
        }); 
         return res.send(path);

    } catch (e) {
        next(e);
    }
}
app.post('/upload/image', uploadImage)


app.use(express.static(__dirname + 'public'));
app.use('/img', express.static(__dirname + 'img')); //Serves resources from public folder

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})  
