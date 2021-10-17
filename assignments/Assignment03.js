// Creating a array to iterate through 18 holes
let elem = [];
var Table = document.getElementById('Table'); // table object to reference 
Table.rows[19].cells[1].innerHTML = 72; // totaling par (constant)

// assign the entire table row for hole 1 to a variable, elem
// elem[1] = document.getElementById("1");

// display the number of children (all td elements)
// console.log(elem.children.length);
// display the content of the + button, which is the first child of the fifth element
// console.log(elem.children[4].children[0]); 

// assign a function to the + button
// elem[1].children[4].children[0].onclick = function(){add1(elem[1]);};

//--------------------------------------------------------------------------------------//

// for loop given to us slighty modified 
// each iteration (meaning each hole has functions to add or subtract a point, update variables to account for over and under par scores, and clear data)
for(let i=1; i<=18; i++) {
  // console.log(i);
  elem[i] = document.getElementById(i.toString());
  elem[i].children[4].children[0].onclick = function(){add1(elem[i]); update();};
  elem[i].children[4].children[1].onclick = function(){sub1(elem[i]); update();};
  elem[i].children[4].children[2].onclick = function(){clearTD(elem[i]); update();};
}

// create an "add1" function
function add1 (elem) {
  // if value is 0 add 1 
  if(elem.children[2].innerHTML == "-") {
    elem.children[2].innerHTML = "1";
    // calculating over/under  score - par 
    elem.children[3].innerHTML= elem.children[2].innerHTML - elem.children[1].innerHTML;
  }

  // if not zero add one to currentScore and calculate over/under
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore); // String to a number 
    elem.children[2].innerHTML = currentScore + 1;
    elem.children[3].innerHTML = elem.children[2].innerHTML - elem.children[1].innerHTML;
  }
}

// identical code but subtracting one rather than adding one 
function sub1 (elem) {
  if(elem.children[2].innerHTML == "-" || 0){
    elem.children[2].innerHTML = "-1";
    elem.children[3].innerHTML = elem.children[2].innerHTML - elem.children[1].innerHTML;
  }

  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore); // String to a number 
    elem.children[2].innerHTML = currentScore - 1;
    elem.children[3].innerHTML = elem.children[2].innerHTML - elem.children[1].innerHTML;
  }
}

// function to iterate through each hole calculating total score and total under/over par 
function update(){
scoreTotal = 0;
overUnderTotal = 0;

// function to iterate through each hole (18)
for(let i=1; i<=18; i++){
  if(Table.rows[i].cells[2].innerHTML != "-")
  scoreTotal += Number.parseInt(Table.rows[i].cells[2].innerHTML); // adding totals vertically down columns for totalScore

  if(Table.rows[i].cells[3].innerHTML != "-") 
  overUnderTotal += Number.parseInt(Table.rows[i].cells[3].innerHTML); // adding totals vertically down columns for total over/under par 
}

  Table.rows[19].cells[2].innerHTML = scoreTotal; // placing variable totals in correct spot 
  Table.rows[19].cells[3].innerHTML = overUnderTotal;
}

// function attached to a button to clear data fields individuallly for each iteration (hole)
function clearTD (elem){
  elem.children[2].innerHTML = "0";
  elem.children[3].innerHTML = "0";
}

