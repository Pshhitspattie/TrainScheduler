 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAfRsjOcd393IDNnj4GI-NDUCFXEdltnso",
    authDomain: "trainschedule-30193.firebaseapp.com",
    databaseURL: "https://trainschedule-30193.firebaseio.com",
    projectId: "trainschedule-30193",
    storageBucket: "trainschedule-30193.appspot.com",
    messagingSenderId: "500510578132"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#train-name-input").val().trim();
  var empDestination = $("#destination-input").val().trim();
  var empTime = moment($("#first-time-input").val().trim(), "HH:mm").format("X");
  var empFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: empName,
    destination: empDestination,
    time: empTime,
    frequency: empFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empDestination = childSnapshot.val().role;
  var empTime = childSnapshot.val().start;
  var empFrequency = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empDestination);
  console.log(empTime);
  console.log(empFrequency);

  // Prettify the employee start
  //var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
 // var empMonths = moment().diff(moment(empStart, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
 // var empBilled = empMonths * empRate;
 // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empDestination),
    $("<td>").text(empTime),
    $("<td>").text(empFrequency)
   
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow); 
});