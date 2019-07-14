function onLoadFunc() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.story = JSON.parse(this.responseText);
        }
    };
    xmlHttp.open("GET", "story.txt", true);
    xmlHttp.send();

    if (localStorage.hasOwnProperty("story")) {
        buttons = document.getElementsByClassName("mainButton");
        buttons[1].disabled = false;
    }
    else {
        buttons = document.getElementsByClassName("mainButton");
        buttons[1].disabled = true;
        buttons[1].classList.remove("mainTransition")
    }

    audio = document.getElementById("audio");
    audio.volume = 0.2;
    window.playing = true;
}

function audioControl() {
    audio = document.getElementById("audio");
    button = document.getElementById("audioControl")
    if (window.playing == true) {
        audio.pause();
        button.innerHTML = "Play";
        window.playing = false;
    }
    else {
        audio.play();
        button.innerHTML = "Pause";
        window.playing = true;
    }
}

function displayTest() {
    document.getElementById("Test1").innerHTML = window.story.storyLines[0].displayText;
    document.getElementById("storyImage").src = window.story.storyLines[0].img;
}

function animateRemove() {
    buttons = document.getElementsByClassName("mainButton");
    buttons[0].classList.remove("mainTransition")
    buttons[0].classList.add("animateRemove");
    buttons[0].disabled = true;
    buttons[1].classList.remove("mainTransition")
    buttons[1].classList.add("animateRemove");
    buttons[1].disabled = true;
    document.getElementById("coverImg").classList.add("animateRemove");
    document.getElementById("audioControl").classList.add("animateRemove");
}

function startNew() {
    mainButtons = document.getElementsByClassName("mainButton");
    mainButtons[0].classList.add("hidden");
    mainButtons[1].classList.add("hidden");
    document.getElementById("coverImg").classList.add("hidden");

    document.getElementById("saveButton").classList.add("animateAdd");
    document.getElementById("saveButton").classList.remove("hidden");
    document.getElementById("storyImage").classList.add("animateAdd");
    document.getElementById("storyImage").classList.remove("hidden");
    document.getElementById("storyText").classList.add("animateAdd");
    document.getElementById("storyText").classList.remove("hidden");
    document.getElementById("audioControl").classList.add("animateAdd");
    loadStoryElement(1);
}

function loadExisting() {
    mainButtons = document.getElementsByClassName("mainButton");
    mainButtons[0].classList.add("hidden");
    mainButtons[1].classList.add("hidden");
    document.getElementById("coverImg").classList.add("hidden");

    document.getElementById("saveButton").classList.add("animateAdd");
    document.getElementById("saveButton").classList.remove("hidden");
    document.getElementById("storyImage").classList.add("animateAdd");
    document.getElementById("storyImage").classList.remove("hidden");
    document.getElementById("storyText").classList.add("animateAdd");
    document.getElementById("storyText").classList.remove("hidden");
    document.getElementById("audioControl").classList.add("animateAdd");
    console.log(localStorage.getItem("storyPosition"));
    loadStoryElement(localStorage.getItem("storyPosition"));
}

function removeStory(id) {
    if (id == -1) {
        location.reload();
    }
    choiceButtons = document.getElementsByClassName("choiceButton");
    for (i = 0; i < 3; i++) {
        choiceButtons[i].classList.remove("animateAdd");
        choiceButtons[i].classList.add("animateRemove");
    }
    document.getElementById("saveButton").classList.remove("animateAdd");
    document.getElementById("storyImage").classList.remove("animateAdd");
    document.getElementById("storyText").classList.remove("animateAdd");
    document.getElementById("audioControl").classList.remove("animateAdd");
    document.getElementById("saveButton").classList.add("animateRemove");
    document.getElementById("storyImage").classList.add("animateRemove");
    document.getElementById("storyText").classList.add("animateRemove");
    document.getElementById("audioControl").classList.add("animateRemove");
    window.redirect = id
}

function addStory() {
    choiceButtons = document.getElementsByClassName("choiceButton");
    for (i = 0; i < 3; i++) {
        choiceButtons[i].classList.remove("animateRemove");
        choiceButtons[i].classList.add("hidden");
    }
    document.getElementById("saveButton").classList.add("animateAdd");
    document.getElementById("storyImage").classList.add("animateAdd");
    document.getElementById("storyText").classList.add("animateAdd");
    document.getElementById("audioControl").classList.add("animateAdd");
    document.getElementById("saveButton").classList.remove("animateRemove");
    document.getElementById("storyImage").classList.remove("animateRemove");
    document.getElementById("storyText").classList.remove("animateRemove");
    document.getElementById("audioControl").classList.remove("animateRemove");
    loadStoryElement(window.redirect);
}

function loadStoryElement(id) {
    currentStoryNode = null;
    size = window.story.storyLines.length;
    for (i = 0; i < size; i++) {
        if (window.story.storyLines[i].id == id) {
            if (window.story.storyLines[i].type == "story") {
                currentStoryNode = window.story.storyLines[i];
                break;
            }
            else {
                window.alert("ERROR LOADING GAME!");
            }
        }
    }
    document.getElementById("storyImage").src = currentStoryNode.img;
    document.getElementById("storyText").innerHTML = currentStoryNode.displayText;
    document.getElementsByClassName("currentStoryId")[0].id = id;
    loadButtonElements(currentStoryNode, size);
}

function loadButtonElements(currentStoryNode, storySize) {
    choiceButtons = document.getElementsByClassName("choiceButton");
    choiceID = null;
    size = currentStoryNode.choiceIDs.length;
    for (i = 0; i < size; i++) {
        if (currentStoryNode.choiceIDs[i] == -1) {
            break;
        }
        for (j = 0; j < storySize; j++) {
            if (window.story.storyLines[j].id == currentStoryNode.choiceIDs[i]) {
                if (window.story.storyLines[j].type == "choice") {
                    choiceNode = window.story.storyLines[j];
                    break;
                }
            }
        }
        choiceButtons[i].classList.add("animateAdd");
        choiceButtons[i].classList.remove("hidden");
        choiceButtons[i].innerHTML = choiceNode.displayText;
        choiceButtons[i].id = choiceNode.redirect
    }
}

function saveGame() {
    currentId = document.getElementsByClassName("currentStoryId")[0].id;
    localStorage.setItem("story", window.story);
    localStorage.setItem("storyPosition", currentId);
    window.alert("Game Saved");
}