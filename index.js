var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    console.log("HOUSTON WE HAVE CREATED THE SERVER");

    res.writeHead(200, {'Content-Type': 'text/html'});
    var object = url.parse(req.url, true).query;

    var user = object.final_user; //+ "";
    var score = object.final_score; // + "";

    //TODO: Display Liked Beers
    // var likedBeers = object.final_likedBeers + "";
    var likedBeers = object.final_likedBeers;



    //TODO: Style all of this
    res.write('<head><style>');
    res.write(' body { background-color: #99b1c9; color: #fff; }');
    res.write('h1 { text-align: center; font-size: 350%; color: #d0302b; text-shadow: 3px 3px #eed147; }');
    res.write('h2 { text-align: center; text-decoration: none; color: #3a7354; }');
    res.write('h3 { color: #345d98; }')
    res.write('div { background-color: #eed147; justify-content: center; margin: 5%; padding: 15px; box-shadow: -8px 8px #d0302b; }');
    res.write('</style></head>');

    res.write("<body><br><h1>The Impossible Brew Quiz</h1>");


    res.write("You Liked the Beer " + likedBeers + "<br>");

    res.write("<h2>" + user + "</h2<br><h2> Final Score - " + score + "<h2>");


    const mongoClient = require('mongodb').MongoClient;
    console.log("attention");
    //note const url2 is PATRICK
    const url2 = "mongodb+srv://demouser:demouser123@cluster0.2ea3z.mongodb.net/beer_quiz?retryWrites=true&w=majority";
    // note  url3 is MADELIME
    // change on below line
    url3 = "mongodb+srv://tempuser:heylookitsMONGODB2001@cluster0.f5arw.mongodb.net/final-project?retryWrites=true&w=majority";
    console.log("earthlings");
    console.log("Mongo url Connected");

    mongoClient.connect(url3, { useUnifiedTopology: true }, function(err, db) {
        console.log("CONNECTING CONNECTING CONNECTION CONNECTION NOT AMISSEDCONNECTION\n\n\n");
        if(err) { return console.log(err); }

        res.write("<br>High Scores<br>");

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
                sorted_scores.sort(function(a, b){return b - a});

                //not trying to sort
                //res.write("In no particular order:<br><br><div>");
                // for (i=0; i<items.length; i++){
                //     console.log(i + ": " + items[i].user + " - score: " + items[i].score + "<br>");
                //     res.write(items[i].score + " - " + items[i].user + "<br>");
                //
                // }
                for (i=0; i<5; i++){
                    console.log(i + ": " + sorted_users[i] + " - score: " + sorted_scores[i] + "<br>");
                    res.write(sorted_scores[i] + " - " + sorted_users[i] + "<br>");

                }
                res.write("</div></body>");
                res.end();
            }

        });//End find()




    });

}).listen(8080);
