//define library
var login = require("facebook-chat-api");
var fs = require("fs");
var express = require('express');
var app     = express();
var Chance = require('chance');
var firebase = require('firebase');

// var sleep = require('sleep');
//--------------DB Infor--------------------
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'answer',
// });
//------------------------------------------
var input = 'abc';
var chance = new Chance();
var numRow;
// connection.connect();


function randomNum(minNum , maxNum){
	var random = chance.integer({min: minNum, max: maxNum});
	return random;
}
//----------------firebase------------------
var config = {
  apiKey: "AIzaSyBBhNzx3cuH4Hwcrhp75ILLHdtHoguMNII",
  authDomain: "blistering-inferno-1760.firebaseapp.com",
  databaseURL: "https://blistering-inferno-1760.firebaseio.com",
  storageBucket: "gs://blistering-inferno-1760.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();

//------------------------------------------

//----------write to database---------------
// function writeData(question, answer) {
//   var qaRef = firebase.database().ref('Q&A');
//   var newRef = qaRef.push();
//   console.log(newRef);
//   newRef.set({
//     question: question,
//     answer: answer,
//   });
// }
function writeData(question, answer, senderId) {
  var qaRef = firebase.database().ref('Question/'+senderId);
  var newRef = qaRef.push();
  console.log(newRef);
  newRef.set({
    question: question,
    answer: answer,
  });
}
//------------------------------------------

//----------read from database---------------
function getAnswer(question, answer) {
  return firebase.database().ref('Q&A').once('value').then(function(snapshot) {
	var answer = snapshot.val();
  });
}
//------------------------------------------

//------------------------------------------
// console.log(randomNum(1, 2));
// connection.query("SELECT count(*) from reply where message ='" + input + "'", function(err, rows, fields) {
// 	if (err) throw err;

// 	console.log(rows);
// 	// numRow = randomNum(0, rows[])
// });
// connection.query("SELECT * from reply where message ='" + input + "'", function(err, rows, fields) {
// 	if (err) throw err;

// 	console.log('The answer is: ', rows[0].reply);
// });
//------------------------------------------

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});



login({appState: JSON.parse(fs.readFileSync('login.json', 'utf8'))}, function callback (err, api) {
    if(err) return console.error(err);
    // Here you can use the api
    api.setOptions({listenEvents: true});

    var stopListening = api.listen(function callback(err, event) {
    	switch(event.type) {
    		case "message":
    			if (typeof event.body === "undefined") {
		    		api.sendMessage("gửi sticker làm giề máy không hiểu đâu", event.threadID);
		    	}
		    	// if (event.senderID == 100003115123146 && event.body != undefined) {
		    	// 	uniqueMessage("Đạt Trần Trọng Tiến","Đạt Tham Thì Thâm phải không nhắn lại cho tui sau nhá :v");
		    	// }
		    	if (event.senderID == 100003115123146 && event.body != undefined) {
		    		//api.sendMessage("Đạt Tham Thì Thâm phải không nhắn lại cho tui sau nhá :v", event.threadID);
		    	}
		    	if (event.body.length() <= 1) {
		    		api.sendMessage("viết chữ gì có nghĩa đi má !!! =_=", event.threadID);
		    		writeData(event.body, "viết chữ gì có nghĩa đi má !!! =_=");
		    	}
		    	// writeData(event.body, 'answertest');
		    	console.log(event);
    			break;
    		case "read_receipt":
    			console.log("Đọc xong thì rep đi chớ :( " + event.threadID);
    			if (event.reader) {
    				//api.sendMessage("Đọc xong thì rep đi chớ :(", event.threadID);
    				break;
    			}
    			break;
    		case "typ":
    			if (event.isTyping) {
    				console.log("nhập nhanh nhanh xíu nha :D");
    				//api.sendMessage("nhập nhanh nhanh xíu nha :D", event.threadID);
    				break;
    			}	
    			if (event.fromMobile) {
    				console.log("wow điện thoại của bạn xịn thế vào được facebook luôn nè");
    				//api.sendMessage("wow điện thoại xịn thế vào được cả facebook", event.threadID);
    				break;
    			}
    			break;
    	}
    	// if (message.body == undefined) {
    	// 	api.sendMessage("gửi sticker làm giề máy không hiểu đâu");
    	// }
    	// if (message.senderID == 100003115123146 && message.body != undefined) {
    	// 	uniqueMessage("Đạt Trần Trọng Tiến","for you only: Đạt Tham Thì Thâm phải không nhắn lại cho tui sau nhá :v");
    	// }
    	// console.log(message);

        // api.sendMessage('you just said: '+message.body, message.threadID);
        // api.sendMessage('Dương đang bận mất rồi nhắn lại sau nhá :3', message.threadID);
	    // api.getUserID("Đạt Trần Trọng Tiến", function(err, data) {
	    //     if(err) return callback(err);

	    //     // Send the message to the best match (best by Facebook's criteria)
	    //     var threadID = data[0].userID;
	    //     api.sendMessage("for you only: Đạt Tham Thì Thâm phải không nhắn lại cho tui sau nhá :v", threadID);
	    // });

	    // api.getUserID("Vũ Mạnh Tuấn", function(err, data) {
	    //     if(err) return callback(err);

	    //     // Send the message to the best match (best by Facebook's criteria)
	    //     var threadID = data[0].userID;
	    //     api.sendMessage("for you only: alo nhắn lại sau nhé", threadID);
	    // });

	    // api.getUserID("Huyền Khánh Đào", function(err, data) {
	    //     if(err) return callback(err);

	    //     // Send the message to the best match (best by Facebook's criteria)
	    //     var threadID = data[0].userID;
	    //     api.sendMessage("for you only: hẹn em yêu vào lúc khác nha :3", threadID);
	    // });

	    // api.getUserID("Hà Thành Nguyễn", function(err, data) {
	    //     if(err) return callback(err);

	    //     // Send the message to the best match (best by Facebook's criteria)
	    //     var threadID = data[0].userID;
	    //     api.sendMessage("for you only: vợ yêu ngoan ngoan nàm việc khác đã khi nào ch on thì ch nhắn cho bò sau na, yêu bò :*", threadID);
	    // });
	    //-------------------------------------------------------------------------------------------------------------------------------------------------
	    //minifier
	    // uniqueMessage("Đạt Trần Trọng Tiến","for you only: Đạt Tham Thì Thâm phải không nhắn lại cho tui sau nhá :v");
	    // uniqueMessage("Vũ Mạnh Tuấn","for you only: alo nhắn lại sau nhé");
	    // uniqueMessage("Huyền Khánh Đào","for you only: hẹn em yêu vào lúc khác nha :3");
	    // uniqueMessage("Hà Thành Nguyễn","for you only: vợ yêu ngoan ngoan nàm việc khác đã khi nào ch on thì ch nhắn cho bò sau na, yêu bò :*");
	    //-------------------------------------------------------------------------------------------------------------------------------------------------
	    


    });
	function uniqueMessage(username, message)
	{
		api.getUserID(username , function(err, data) {
			if (err) return callback(err);
			var threadID = data[0].userID;
			api.sendMessage(message, threadID);
		});
	}
});

// connection.end();

