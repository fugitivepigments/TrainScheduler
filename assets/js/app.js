console.log("HI!")

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAgyN40Bn-pDO28DDb7-he3C2B_3Z5NiAc",
  authDomain: "trainsched-f746b.firebaseapp.com",
  databaseURL: "https://trainsched-f746b.firebaseio.com",
  projectId: "trainsched-f746b",
  storageBucket: "trainsched-f746b.appspot.com",
  messagingSenderId: "1001418399415"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //gets user input
  var trainName = $("#train-name-input").val().trim();
  var destName = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    dest: destName,
    first: firstTrain,
    freq: frequency,
  };

  //uploads train data to firebase
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  alert("Train successfully added yo!");
  //clear text input boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //store vars
  var trainName = childSnapshot.val().name;
  var destName = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  //convert time and subtract one year to make sure it comes before current time
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTrainConverted);

  //current time
  var currentTime = moment();
  console.log("Current time: " + moment(currentTime).format("hh:mm"));

  //difference between times
  var timeDiff = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("Difference in time: " + timeDiff);

  //time apart
  var timeApart = timeDiff % frequency;
  console.log(timeApart);

  //mins till train
  var minTillTrain = frequency - timeApart;
  console.log("minutes till train yo: " + minTillTrain);

  //next train arrival
  var nextTrain = moment().add(minTillTrain, "minutes");
  var nextArrival = moment(nextTrain).format("hh:mm");
  console.log("Arrival time: " + nextArrival);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minTillTrain + "</td><td>");

});
