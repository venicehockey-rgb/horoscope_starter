
document.getElementById("startButton").addEventListener("click",process);
document.getElementById("saveButton").addEventListener("click",save);
document.getElementById("retrieveButton").addEventListener("click",retrieve);
document.getElementById("resetButton").addEventListener("click",reset);
document.getElementById("randomizeButton").addEventListener("click",randomize);

let students = [];
let nextId = 0;
let roomRows = 4;
let roomCols = 8;

let mSeats = ["00","02","04", "06", "20", "22", "24", "26"];

function save(){    
    let s = JSON.stringify(students);
    localStorage.setItem("students", s);
}

function retrieve(){    
    let s = localStorage.getItem("students");
    if (s) {
        students = JSON.parse(s);
    } else {
        students=[];
    }
    
    console.log(students)
}

function process(){
    students=[];
    
    let s = document.getElementById("rosterInput").value;
    let nameArray = s.split("\n\n")


    for(let i = 0; i < nameArray.length; i++){
        let name = nameArray[i].trim();
        if (name!== "") {
            students.push(new Student(name));
        }
    }

    console.log(students)
    buildDropdowns();
    seatStudents();
}

function seatStudents(){

    console.log(students.sort);
    let o = "";
    let count = 0;

    //builds html table
    for(let rows = 0; rows < roomRows; rows++){
        o += "<tr>";

        for(let cols = 0; cols < roomCols; cols++){
            
            o+= "<td id=color" + rows + cols + "></td>"

        }

        o += "</tr>";

    }

    //write the built table to the page
    document.getElementById("table").innerHTML = o;

    /*
        const arr = ["joe","mary","matt"];
        arr.splice(1, 0, ""); // index 1, remove 0 items, insert 99
        console.log(arr); // ["joe","","mary","matt"]
*/


    let n=students.length;
    let numTables;
    if (n % 4 === 0) {
        numTables=n/4;
    } else if (n % 4 === 1) {
        numTables=Math.floor(n/4);
    } else {
        numTables=Math.floor(n/4)+1;
    }
    //add students to table
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

            document.getElementById("color" + row + col ).innerHTML = students[count].name
            count++;
        }
    }
}

function buildDropdowns(){
    let a = "";

    for(let i = 0; i < students.length; i++){
    
        a += "<option value='" + students[i].id + "'>" + students[i].name + "</option>"

    }
    for (let i=1; i<=6; i++) {
        document.getElementById("studentSeperator" +i).innerHTML=a;
    }

    
}

function reset() {
    students = [];
    seatStudents();
}

function randomize() {
    let m =students.length, t, i;
    while (m) {
        i=Math.floor(Math.random() *m--);
        t=students[m];
        students[m]=students[i];
        students[i]=t;
    }
    seatStudents();
}

class Student {

    constructor(name){
        this.id = nextId++;
        this.name = name;
    }

}

