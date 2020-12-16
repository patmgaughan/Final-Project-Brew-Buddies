var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    console.log("HOUSTON WE HAVE CREATED THE SERVER");

    res.writeHead(200, {'Content-Type': 'text/html'});
    var object = url.parse(req.url, true).query;

    var user = object.final_user; //+ "";
    var score = object.final_score; // + "";
    var email = object.final_email;

    //TODO: Display Liked Beers
    // var likedBeers = object.final_likedBeers + "";
    var likedBeers = object.final_likedBeers;

    // require("openurl").mailto(["patmgaughan@gmail.com"],
    //     { subject: "The Impossible Beer Quiz", body: "This is\na generated email!\n" });



    if(email != undefined){

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'theimpossiblebrewquiz@gmail.com',
                pass: 'demouser123'
            }
        });

        var mailOptions = {
            from: 'theimpossiblebrewquiz@gmail.com',
            to: email,
            subject: 'The Impossible Beer Quiz',
            html: likedBeers
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }


    //TODO: Style all of this
    res.write('<head><style>');
    //res.write('<link rel="stylesheet" type="text/css" href="beerQuiz.css">');
	//res.write('<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">');
    res.write('body { font-family: "Trebuchet MS", Helvetica, sans-serif; background-color: #fff; color: #345d98; margin: 0px; height: 100%; text-align: center; }');

    res.write('h1 { font-size: 50px; text-align: center; margin: 5px; padding: 5px; color: #eed147; text-shadow: 2px 2px 0px #000;}');
    res.write('h2 { display: block; font-size: 26px; }');
    res.write('.currUser { font-size: 20px; background-color: #345d98; text-align: center; color: #fff; border-style: solid; border-width: 2px; border-color: #000; padding: 10px; display: inline-block; font-weight:normal; margin:0;}');
    res.write('.otherUser { font-size: 20px; }');
    res.write('header { margin: 0px; padding: 5px; font-size: 28px; display: block; background-color: #000; text-align: right; color: #fff;}');

    res.write('footer { position: fixed; left: 0; bottom: 0; width: 100%; padding: 0px; color: #fff; text-shadow: 2px 2px #509ec4; text-align: center; }');
    res.write('#likedBeersArr {margin: 0px; padding: 5px; background-color: #509ec4; }');
    res.write('.try_again {border: 2px solid black;border-radius: 500px;padding: 6px 9px;font-family: "Cooper Black", Courier, monospace;background-color: #eee;color: #345d98;box-shadow: -3px 3px #eed147;border-style: none;transition: all 0.2s ease-in-out; text-decoration: none; margin: 20px; font-size: 15px;}');
    res.write('.try_again:hover {cursor: pointer;background-color: #FFE66E;}');
    // res.write('div { background-color: #eed147; justify-content: center; margin: 5%; padding: 15px; box-shadow: -8px 8px #d0302b; }');
    // res.write('div { margin: 50px; font-family: "Trebuchet MS", Helvetica, sans-serif; border-style: solid; border-width: 2px; font-size: 1.5em; margin-block-start: 0.83em; margin-block-end: 0.83em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;}');
    // res.write('div:hover {cursor: pointer; background-color: #FFE66E}');
    res.write('#liked-form { display: block; text-align: center; background-color:rgba(212, 175, 55, 0.65); color: #463500; padding: 10px;}');
    res.write('#username { margin: 5px; padding: 10px; display: inline-block;  color: #509ec4;}');
    res.write('#score { font-size: 26px; margin: 15px; padding: 10px; display: inline-block; background-color: #509ec4; text-align: center; color: #fff; border-style: solid; border-width: 2px;border-color: #000;}');

    res.write('</style></head>');

    res.write('<body><header id="header"><div id="username">' + user + '</div><h1>The Impossible Brew Quiz</h1></header>');
    res.write('<div id="liked-form"></div>');

    res.write("<div id='score'>Your Final Score - " + score + '<br><br><a class="try_again" href="https://patmgaughan.github.io/Final-Project-Brew-Buddies/">Play Again!</a><br></div>');
    //res.write('<a class="try_again" href="https://patmgaughan.github.io/Final-Project-Brew-Buddies/">Try Again!</a>');
    res.write("<h2>High Scores:</h2>");


    // res.write("Your Liked Beers " + likedBeers + "<br>");

    //res.write("<h2>" + user + "</h2<br><h2> Final Score - " + score + "<h2>");
    //res.write("<h2> Scroll to the bottom to see the high scores and how you compare! </h2>");


    const mongoClient = require('mongodb').MongoClient;
    console.log("attention");
    //note const url2 is PATRICK
    const url2 = "mongodb+srv://demouser:demouser123@cluster0.2ea3z.mongodb.net/beer_quiz?retryWrites=true&w=majority";
    // note  url3 is MADELIME
    // change on below line
    url3 = "mongodb+srv://tempuser:heylookitsMONGODB2001@cluster0.f5arw.mongodb.net/final-project?retryWrites=true&w=majority";
    console.log("earthlings");
    console.log("Mongo url Connected");

    mongoClient.connect(url2, { useUnifiedTopology: true }, function(err, db) {
        console.log("CONNECTING CONNECTING CONNECTION CONNECTION NOT AMISSEDCONNECTION\n\n\n");
        if(err) { return console.log(err); }

        //res.write("<h2><br>High Scores<br></h2>");

        var dbo = db.db("beer_quiz");
        var coll = dbo.collection('highscores');

        //TODO: Make it so we can also do this function, but it doesn't do it twice
        var newData = {"user": user, "score": score};
        console.log(" - - - - - - -- - - - - - - - -- - - --- -- - - -- -");
        console.log("newData: " + newData["user"] + " " + newData["score"]);
        if (newData["user"] != undefined && newData["score"] != null) {
            console.log("HEY NEWDATA ISNT NULL YO\n\n\n");
            coll.insertOne(newData, function(err, res) {
                console.log("calling insertOne");
                if (err) {
                    console.log("Error: " + err);
                    throw err;
                }else{
                    console.log("new document inserted");
                }
            });//End insertOne()
        }

        //TODO: Order these; and its still doing this twice
        coll.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: " + err);
                throw err;
            }
            else
            {
                // res.write("<h2>Final Score - " + score + "</h2>");
                // res.write("<h2><High Scores</h2>");
                //trying to sort
                var sorted_scores = new Array();
                var sorted_users = new Array();

                for (var i = 0; i < items.length; i++) {
                    sorted_scores.push(items[i].score);
                    sorted_users.push(items[i].user);
                    // console.log(items[i].score);
                    // console.log(items[i].user);
                    // console.log("\n");
                }
                var combined = [];

                for (var j = 0; j < sorted_scores.length; j++){ 
                    combined.push({'user': sorted_users[j], 'score': sorted_scores[j]});
                }

                combined.sort(function(a, b){return b.score - a.score});


                var length = 5;

                if(length >= combined.length){
                    length = combined.length;
                    //console.log("Length is - " + combined.length);
                }

                var first = true;

                for (i=0; i<length; i++){
                    console.log(i + ": " + combined[i].user + " - score: " + combined[i].score);

                    if((combined[i].user == user) && (combined[i].user == score) && (first)){
                        res.write("<h3 class='currUser'>" + combined[i].score + " - " + combined[i].user + "</h3>");
                        first = false;
                    }else{
                        res.write("<h3 class='otherUser'>" + combined[i].score + " - " + combined[i].user + "</h3>");
                    }
                

                }
                res.write("</div></body>");
                res.write("<footer id='footer'><div id='likedBeersArr'>SPAM Inc.</div><footer>");
                res.end();
            }

        });//End find()




    });

    //showing liked beers
    // res.write("<h2>You Liked the Beers: </h2>");
    // var likedBeersAsJSON = JSON.parse(object.final_likedBeers);
    // // console.log("likedBeersAsJSON.length: " + likedBeersAsJSON.length);
    // if (likedBeersAsJSON != undefined) {
    //     for (var i = 0; i < likedBeersAsJSON.length; i++) {
    //         console.log(i);
    //         var html_result = showBeerJSON(likedBeersAsJSON[i]);
    //         if (html_result != undefined) {
    //             res.write("<div id='liked'>" + html_result + "</div>");
    //         }
    //     }
    // }
    // end of liked beers

}).listen(8080);


function showBeerJSON(beer){

    output = "";
    // res.write();
    output += "<h2>" + beer["name"] +"<h2>";
    output += "<br>";
    output += "<img src='" + beer["image_url"] + "' height=300 />";
    output += "<p>" + beer["description"] + "<p>";

    return output;

}
