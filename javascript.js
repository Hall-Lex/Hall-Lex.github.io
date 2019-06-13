function dateAndTime() {
    document.getElementById("dateAndTimeP").innerHTML = Date();
}

function loop() {
    var loopNum = document.getElementById("loopCount").value;
    if (loopNum <= 0) {
        loopNum = 10
    }
    for (i = 0; i < loopNum; i++) {
        countPrint(loopNum - i);
    }
}

function countPrint(time) {
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode("Count: " + time);
    var parent = document.getElementById("loopList");
    newDiv.appendChild(newContent);
    parent.insertBefore(newDiv, parent.childNodes[0]);
}

function removeCountChildren() {
    var parent = document.getElementById("loopList");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function person(first, last, age) {
    this.firstName = first
    this.lastName = last
    this.age = age
}

function createPerson() {
    var newEmployee = new person("John", "Smith", 35);
    person.prototype.additionalInfo = document.getElementById("protoAttri").value;
    document.getElementById("objectOutput").innerHTML = "You have added the following note to " + newEmployee.lastName + ", " + newEmployee.firstName + ": " + newEmployee.additionalInfo;
}

function parse() {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var JSONObj = JSON.parse(this.responseText);
            output = JSONObj.tasks.toString()
            document.getElementById("jsonOutput").innerHTML = output;
        }
    };
    xmlRequest.open("GET", "json_file.txt", true);
    xmlRequest.send();
}

function changeJSONOutput(xmlRequest) {
    if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
        var JSONObj = JSON.parse(xmlRequest.responseText);
        output = JSONObj.tasks.toString()
        document.getElementById("jsonOutput").innerHTML = output;
    }
}

function locStorageStore() {
    if (typeof (Storage) !== "undefined") {
        var store = document.getElementById("locStorageIn").value;
        localStorage.setItem("notes", store);
        document.getElementById("locStorageOut").innerHTML = "Note Saved!";
    }
    else {
        docuemnt.getElementById("locStorageOut").innerHTML = "Storage not supported.";
    }
}

function locStorageRead() {
    if (typeof (Storage) !== "undefined") {
        document.getElementById("locStorageOut").innerHTML = localStorage.getItem("notes");
    }
    else {
        docuemnt.getElementById("locStorageOut").innerHTML = "Storage not supported.";
    }
}

function drawOnCanvas() {
    var canvas = document.getElementById("exampleCanvas");
    var canvasContext = canvas.getContext("2d");
    canvasContext.font = "30px Arial";
    canvasContext.strokeText("Canvas", 50, 50);
    canvasContext.strokeText("Drawing", 45, 80);
}

function rotateColor() {
    var color = document.getElementById("colorVar").innerHTML
    switch (color) {
        case "0":
            document.getElementById("jsCssExample").style.color = "green";
            document.getElementById("colorVar").innerHTML = "1"
            break;

        case "1":
            document.getElementById("jsCssExample").style.color = "yellow";
            document.getElementById("colorVar").innerHTML = "2"
            break;

        case "2":
            document.getElementById("jsCssExample").style.color = "red";
            document.getElementById("colorVar").innerHTML = "3"
            break;

        case "3":
            document.getElementById("jsCssExample").style.color = "black";
            document.getElementById("colorVar").innerHTML = "0"
            break;
    }
}

function increaseFont() {
    document.getElementById("jsCssExample").style.fontSize = "larger";
}

function decreaseFont() {
    document.getElementById("jsCssExample").style.fontSize = "smaller";
}

function startAnimation() {
    document.getElementById("animate").className = "animateClass";
}