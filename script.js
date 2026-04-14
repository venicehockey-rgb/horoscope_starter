
document.getElementById("startButton").addEventListener("click",process);
document.getElementById("saveSep").addEventListener("click",randomize);

let roster = [];
let nextId = 0;
let roomRows = 4;
let roomCols = 8;

 let mSeats = ["00","02","04", "06", "20", "22", "24", "26"];
 


function process(){
    roster=[];
    
    let s = document.getElementById("rosterInput").value;
    let nameArray = s.split("\n\n")


    for(let i = 0; i < nameArray.length; i++){
        let name = nameArray[i].trim();
        if (name!== "") {
            roster.push(new Student(name));
        }
    }

    console.log(roster)
    buildDropdowns();
}

function seatStudents(){
    let o = "";
    let count = 0;

    for(let rows = 0; rows < roomRows; rows++){
        o += "<tr>";
        for(let cols = 0; cols < roomCols; cols++){
            o+= "<td id=color" + rows + cols + "></td>"
        }
        o += "</tr>";
    }

    document.getElementById("table").innerHTML = o;

    let n=roster.length;
    let numTables;
    if (n % 4 === 0) {
        numTables=n/4;
    } else if (n % 4 === 1 || n % 4 === 2) {
        numTables=Math.ceil(n/4);
    } else {
        numTables=Math.floor(n/4)+1;
    }
   
    for(let j = 0; j < 4; j++){
        let row, col;
        for(let i = 0; i < numTables; i++){

            if(j==0){
                row = parseInt(mSeats[i][0]);
                col = parseInt(mSeats[i][1]);
            } else if(j==1){
                row = parseInt(mSeats[i][0]) + 1;
                col = parseInt(mSeats[i][1]);
            } else if(j==2){
                row = parseInt(mSeats[i][0]);
                col = parseInt(mSeats[i][1]) + 1;
            } else {
                row = parseInt(mSeats[i][0]) + 1;
                col = parseInt(mSeats[i][1]) + 1;
            }

            if (count<roster.length) {
                document.getElementById("color" + row + col ).innerHTML = roster[count].name
                count++;
            }
        }
    }
}

function buildDropdowns(){
    let a = "<option value=''></option>";

    for(let i = 0; i < roster.length; i++){
    
        a += "<option value='" + roster[i].id + "'>" + roster[i].name + "</option>"

    }
    for (let i=1; i<=6; i++) {
        document.getElementById("studentSeperator" +i).innerHTML=a;
    }

    
}

function reset() {
    roster = [];
    seatStudents();
}

function randomize() {
 let one = document.getElementById("studentSeperator1").value;
 let two = document.getElementById("studentSeperator2").value;
 let three = document.getElementById("studentSeperator3").value;
 let four = document.getElementById("studentSeperator4").value;
 let five = document.getElementById("studentSeperator5").value;
 let six = document.getElementById("studentSeperator6").value;

 console.log(one, two, three, four, five, six);
    shuffle();
    seatStudents();
    while(separate(one, two, three, four, five, six)) {
        shuffle();
        seatStudents();
    }
}
function shuffle() {
    let m =roster.length, t, i;
    while (m) {
        i=Math.floor(Math.random() *m--);
        t=roster[m];
        roster[m]=roster[i];
        roster[i]=t;
    }
}

function getTable(name){
    let n=roster.length;
    let numTables;
    if (n % 4 === 0) {
        numTables=n/4;
    } else if (n % 4 === 1 || n % 4 === 2) {
        numTables=Math.ceil(n/4);
    } else {
        numTables=Math.floor(n/4)+1;
    }

    for(let i=0; i<numTables; i++) {
        let row = parseInt(mSeats[i][0]);
        let col = parseInt(mSeats[i][1]);

        let spots= [
            document.getElementById("color" + row + col),
            document.getElementById("color" + (row+1) + col),
            document.getElementById("color" + row + (col+1)),
            document.getElementById("color" + (row+1) + (col+1))
        ];

        for(let j=0; j<spots.length; j++) {
            if (spots[j].innerHTML === name) {
                return i;
            }
        }
    }
    return false;
}   

function separate(one, two, three, four, five, six) {
    let pairs =[[one, two], [three, four], [five, six]];
    
    for (let i=0; i<pairs.length; i++) {
        if (pairs[i][0] && pairs[i][1]){
        let nameA;
            let nameB;
            for (let j=0; j<roster.length; j++) {
                if(roster[j].id==pairs[i][0]) {
                    nameA=roster[j].name;
                }
                if(roster[j].id==pairs[i][1]) {
                    nameB=roster[j].name;
                }
            }
            if (nameA && nameB) {
                if (getTable(nameA) === getTable(nameB)) {
                    return true;
                }
            }
        }
    } 
    return false;
}

class Student {

    constructor(name){
        this.id = nextId++;
        this.name = name;
    }

}

