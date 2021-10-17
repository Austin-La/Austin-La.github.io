// Creating a array to iterate through 18 holes
let elem = [];
var Table = document.getElementById('Table'); // table object to reference 
Table.rows[19].cells[1].innerHTML = 72;

// assign the entire table row for hole 1 to a variable, elem
// elem[1] = document.getElementById("1");

// display the number of children (all td elements)
// console.log(elem.children.length);
// display the content of the + button, which is the first child of the fifth element
// console.log(elem.children[4].children[0]); 

// assign a function to the + button
// elem[1].children[4].children[0].onclick = function(){add1(elem[1]);};

for(let i=1; i<=18; i++) {
  // console.log(i);
  elem[i] = document.getElementById(i.toString());
  elem[i].children[4].children[0].onclick = function(){add1(elem[i]); update();};
  elem[i].children[4].children[1].onclick = function(){sub1(elem[i]); update();};
  elem[i].children[4].children[2].onclick = function(){clearTD(elem[i]); update();};
}

// create an "add1" function
function add1 (elem) {
  if(elem.children[2].innerHTML == "-") {
    elem.children[2].innerHTML = "1";
    elem.children[3].innerHTML= elem.children[2].innerHTML - elem.children[1].innerHTML;
  }

  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore + 1;
    elem.children[3].innerHTML = elem.children[2].innerHTML - elem.children[1].innerHTML;
  }
}

function sub1 (elem) {
  if(elem.children[2].innerHTML == "-" || 0){
    elem.children[2].innerHTML = "-1";
    elem.children[3].innerHTML = elem.children[2].innerHTML - elem.children[1].innerHTML;
  }

  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore - 1;
    elem.children[3].innerHTML = elem.children[2].innerHTML - elem.children[1].innerHTML;
  }
}


function update(){
scoreTotal = 0;
overTotal = 0;

for(let i=1; i<=18; i++){
  if(Table.rows[i].cells[2].innerHTML != "-")
  scoreTotal += Number.parseInt(Table.rows[i].cells[2].innerHTML);

  if(Table.rows[i].cells[3].innerHTML != "-") 
  overTotal += Number.parseInt(Table.rows[i].cells[3].innerHTML);
}

  Table.rows[19].cells[2].innerHTML = scoreTotal;
  Table.rows[19].cells[3].innerHTML = overTotal;
}


function clearTD (elem){
  elem.children[2].innerHTML = "0";
  elem.children[3].innerHTML = "0";
}

