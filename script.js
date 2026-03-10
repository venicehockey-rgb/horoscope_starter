//ranmoze you students array - shuffle, look up the Fisher-Yates algorithm
// https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array 


document.getElementById("startButton").addEventListener("click",process);
document.getElementById("saveButton").addEventListener("click",save);
document.getElementById("retrieveButton").addEventListener("click",retrieve);
document.getElementById("resetButton").addEventListener("click",reset);

let students = [];
let nextId = 0;
let roomRows = 4;
let roomCols = 8;

function save(){    
    let s = JSON.stringify(students);
    localStorage.setItem("students", s);
}

function retrieve(){    
    let s = localStorage.getItem("students");
    students = JSON.parse(s);
    console.log(students)
}

function process(){

    let s = document.getElementById("rosterInput").value;
    let nameArray = s.split("\n\n")


    for(let i = 0; i < nameArray.length; i++){
        let obj = new Student(nameArray[i]);
        students.push(obj);
    }

    console.log(students)
    buildDropdowns();
    seatStudents();
}

function seatStudents(){

    console.log(students.sort);
    let o = "";
    let count = 0;

    for(let rows = 0; rows < roomRows; rows++){
        o += "<tr>";

        for(let cols = 0; cols < roomCols; cols++){
            
            if(students.length > count) {
                o+= "<td id=color" + rows + cols + ">" + students[count].name + "</td>"
            } else {
                o+= "<td id=" + rows + cols + "></td>";                
            }
            count++;

        }

        o += "</tr>";

    }

    document.getElementById("table").innerHTML = o;

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

class Student {

    constructor(name){
        this.id = nextId++;
        this.name = name;
    }

}

