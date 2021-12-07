  // Author: Corser 
	// Editor: Austin LaFramboise
	// Date: 11/27/21
	//NOTE: I Struggled with this assignment for many many hours and after discovering you had a finished version of it on Canvas I decided to annotate it to display my understanding 
	// I DONT TAKE CREDIT FOR THE CODE WRITTEN but for the annotations illustrating whats happening. If this is unaccepable I apoligize deeply and dont wish to plagiarize. 
	// I'd accept a zero on this assignment but if you'd wish for me to submit my unfinished sloppy work i may.


// some code below derived from Quinn Friebe's work at 
// http://webp.svsu.edu/~qefriebe/cis255/as06/as06.html

// ===== GLOBAL VARIABLES =====

// Default values for chart 
// Will apply upon webpage refresh 
let loans = [
  { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
  { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
]; 

// Variables to later reference
let loanWithInterest = 0;
let int = 0;
let payments;

// ----- Plain JavaScript Functions -----

// Function to place commas where needed (Yearly Balance/ Payments Data)
function toComma(value) {
return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Regular expression 
}

// Function to amend outputs as currency if required 
let toMoney = (value) => {
return `\$${toComma(value.toFixed(2))}`; 
}

//it puts it in local storage of that device
let saveForm = () => {
  localStorage.setItem(`as06`, JSON.stringify(loans));
}

//gets inside the localstorage and updates the form in that localstorage
let loadForm = () => {
  if(localStorage.getItem(`as06`) != null){
     loans = JSON.parse(localStorage.getItem(`as06`));
     updateForm();
  } else {
     alert(`Error: no saved values`);
  }
}
// ----- JQUERY Functions -----

// Display the entry form
function loadDoc() {
  
// pre-fill defaults for first loan year
// First row of data preset 
// Utilizing JQuery selectors 
var defaultYear = loans[0].loan_year; // Year column (First year)
$("#loan_year0" + 1).val(defaultYear++);
var defaultLoanAmount = loans[0].loan_amount; // Amount column (First year)
$("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2)); 
var defaultInterestRate = loans[0].loan_int_rate; // Int Rate column (First year)
$("#loan_int0" + 1).val(defaultInterestRate);
var loanWithInterest 
  = loans[0].loan_amount * (1 + loans[0].loan_int_rate); // Computing new value of loan after interest calculation, formatting the result as currency and adding commas if necessary 
$("#loan_bal0" + 1).text(toMoney(loanWithInterest));
  
// pre-fill defaults for other loan years
// Remaining data fields are handled 
for(var i=2; i<6; i++) { // There are 5 input fields (0 Based) 
  $(`#loan_year0${i}`).val(defaultYear++); // Adding one to the first years input (starting in the 2nd row) saving that value and continuing down the "Year" row until rows are exhausted
  $(`#loan_year0${i}`).attr("disabled","true"); // Locking the "Year" data fields so users can't edit them 
  $(`#loan_year0${i}`).css({
    "backgroundColor":"grey","color":"white" // Background of "Year" data fields are grey and the text is white 
  });
  $(`#loan_amt0${i}`).val(defaultLoanAmount.toFixed(2));
  $(`#loan_int0${i}`).val(defaultInterestRate);
  $(`#loan_int0${i}`).attr("disabled","true");
  $(`#loan_int0${i}`).css({
    "backgroundColor":"grey","color":"white"
  });
  loanWithInterest 
    = (loanWithInterest + defaultLoanAmount) // Computing new value of loan after interest calculation for each remaining years, formatting the result as currency and adding commas if necessary 
    * (1 + defaultInterestRate);
  $("#loan_bal0" + i).text(toMoney(loanWithInterest));
} // end: "for" loop
  
// Simple CSS and selectors to display colors when bluring/hovering data fields 
$("input[type=text]").focus(function() {
  $(this).select(); // When a data field is clicked on display a yellow background to indicate position on the page (Excluding uneditable fields)
  $(this).css("background-color", "yellow"); 
}); 
$("input[type=text]").blur(function() {
  $(this).css("background-color", "white"); // When a data field is clicked off of display a white background to indicate position on the page (Excluding uneditable fields)
  updateLoansArray(); //
});
  
// set focus to first year: messes up codepen
// $("#loan_year01").focus();

} // end: function loadDoc()

// Function to save user entered data over the default loans array (running after each loop) (4 total) 
function updateLoansArray() {

// regex tester web site: https://www.regexpal.com/
// Variables to test for conditions
let yearP = /^(19|20)\d{2}$/; // The first "Year" field must begin with a 19 or 20 (19|20)
let amtP = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/; // The "Amount" field(s) must begin with a number (0-9), more numbers are allowed, must have a double value (decimal) (I think this is wrong)
let intP = /^(0|)+(.[0-9]{1,5})?$/; // Within the "Int Rate" field(s) no more than 5 digits is allowed after the decimal 
                                    // NOTE: I'm unsure of what (0|) does. 

let valid = true; // Boolean variable to test if imput passes heuristics above
if(!yearP.test($(`#loan_year01`).val())){
  valid = false;
  $(`#loan_year01`).css("background-color", "red"); // If "year" input doesnt pass regex "test" alert user by turning background color red (NO need for for loop) (only one year field)
}

// For loop handling remaining fields 
for (i = 1; i < 6; i++) {
  if(!amtP.test($(`#loan_amt0${i}`).val())) {
    valid = false; // if fails regex heuristic
    $(`#loan_amt0${i}`).css("background-color", "red"); // If "Amount" input doesnt pass regex "test" alert user by turning background color red 
  }
  } 
}
if(!intP.test($(`#loan_int01`).val())) {
  valid = false; // if fails regex heuristic
  $(`#loan_int01`).css("background-color", "red"); // If "Interest Rate" input doesnt pass regex "test" alert user by turning background color red 
}

// If inputs are allowed update the loans array and accompaying variables 
if(valid) { 
  loans[0].loan_year = parseInt($("#loan_year01").val()); // turning "Year" input into string to test regex
  for(var i=1; i<5; i++) { // "Year" input is allowed
    loans[i].loan_year = loans[0].loan_year + i; // Adding one to "Year" input for remaing rows (4 remaining after user input)
  }
  for(i = 1; i<6; i++){ // "Amount" input is allowed
    let amt = parseFloat($(`#loan_amt0${i}`).val()).toFixed(2);
    loans[i-1].loan_amount = amt;
  }
  let rate = parseFloat($("#loan_int01").val());
  for(i=0; i<5; i++){ // "Interest Rate" input is allowed
    loans[i].loan_int_rate = rate; // Fixed Interest Rate for all rows 
  }
  
  updateForm(); // Keeping form updated with constantly changing inputs (only if inputs are valid)
  
} // end: if

 // end: function updateLoansArray()

// Arrow function to display results 
let updateForm = () => {
loanWithInterest = 0;
let totalAmt = 0;

// All fields 
for(i = 1; i < 6; i++) {
  $(`#loan_year0${i}`).val(loans[i - 1].loan_year); // Displaying "Year" fields
  let amt = loans[i - 1].loan_amount;
  $(`#loan_amt0${i}`).val(amt); // Displaying "Amount" fields
  totalAmt += parseFloat(amt);
  $(`#loan_int0${i}`).val(loans[i - 1].loan_int_rate); // Displaying "Interest Rate" fields
  loanWithInterest 
    = (loanWithInterest + parseFloat(amt)) // Displaying new loan value 
    * (1 + loans[0].loan_int_rate);
  $("#loan_bal0" + i).text(toMoney(loanWithInterest)); // Formatting new loan value
}
int = loanWithInterest - totalAmt;
$(`#loan_int_accrued`).text(toMoney(int)); // Value of interest paid

} // end: function updateForm()


// ----- ANGULAR -----

// Angular app
var app = angular.module('myApp', []);

// Angular controller
app.controller('myCtrl', function($scope) {
$scope.payments = []; // Array that controller has access too

// Function to add inputs to that array above ($scope.payments = [];)
$scope.populate = function () {
  
  updateForm(); //updated form 
  
  // Variables for finalized values 
  let total = loanWithInterest; // "Total Payment" values
  let iRate = loans[0].loan_int_rate; // "Interest Amount" values
  let r = iRate / 12; // Yearly 
  let n = 11; // 11 projected years to display

  //loan payment formula
  //https://www.thebalance.com/loan-payment-calculations-315564


  let pay = 12 * (total / ((((1+r)**(n*12))-1)/(r *(1+r)**(n*12)))); // I'm unsure whats happening here
  for (let i = 0; i < 10; i++) {
    total -= pay 
    let int = total * (iRate); 
    $scope.payments[i] = {
      "year":loans[4].loan_year + i + 1,
      "payment": toMoney(pay), 
      "amt": toMoney(int),
      "ye": toMoney(total += int)
    }
  }
  $scope.payments[10] = {
    "year":loans[4].loan_year + 11,
    "payment": toMoney(total),
    "amt": toMoney(0),
    "ye":toMoney(0)
  }
}
});